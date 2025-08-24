import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";

// Get All Blogs
export const useBlogsData = (category = "", status = "published") => {
  return useQuery({
    queryKey: ["blogs", category, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (category) {
        params.append('category', category);
      }
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`/api/blog?${params}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Single Blog by ID
export const useBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!id, // Only run if id exists
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Create Blog (Admin only)
export const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (blogData) => {
      const formData = new FormData();
      
      // Append all blog fields
      Object.keys(blogData).forEach(key => {
        if (key === 'coverImage' && blogData[key]) {
          // Handle cover image file
          formData.append('coverImage', blogData[key]);
        } else if (key === 'tags' && Array.isArray(blogData[key])) {
          // Convert tags array to JSON string
          formData.append('tags', JSON.stringify(blogData[key]));
        } else if (blogData[key] !== undefined && blogData[key] !== null) {
          formData.append(key, blogData[key]);
        }
      });

      // Add admin flag
      formData.append('isAdmin', 'true');

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create blog");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      
      // Optionally add the new blog to existing cache
      const queryCache = queryClient.getQueryCache();
      const blogQueries = queryCache.findAll({
        queryKey: ["blogs"]
      });

      blogQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            blogs: [data.blog, ...oldData.blogs],
            count: (oldData.count || 0) + 1,
          };
        });
      });
    },
  });
};

// Update Blog (Admin only)
export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: async ({ id, blogData }) => {
      const formData = new FormData();
      
      // Append all blog fields
      Object.keys(blogData).forEach(key => {
        if (key === 'coverImage' && blogData[key]) {
          // Handle cover image file
          formData.append('coverImage', blogData[key]);
        } else if (key === 'tags' && Array.isArray(blogData[key])) {
          // Convert tags array to JSON string
          formData.append('tags', JSON.stringify(blogData[key]));
        } else if (blogData[key] !== undefined && blogData[key] !== null) {
          formData.append(key, blogData[key]);
        }
      });

      // Add admin flag
      formData.append('isAdmin', 'true');

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { id } = variables;
      
      // Invalidate single blog cache to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      
      // Update blogs list cache
      const queryCache = queryClient.getQueryCache();
      const blogQueries = queryCache.findAll({
        queryKey: ["blogs"]
      });

      blogQueries.forEach((query) => {
        queryClient.invalidateQueries({ queryKey: query.queryKey });
      });
    },
  });
};

// Delete Blog (Admin only)
export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: true }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete blog");
      }
      
      return { id, ...await response.json() };
    },
    onSuccess: (data) => {
      // Remove from single blog cache
      queryClient.removeQueries({ queryKey: ["blog", data.id] });
      
      // Update blogs list cache
      const queryCache = queryClient.getQueryCache();
      const blogQueries = queryCache.findAll({
        queryKey: ["blogs"]
      });

      blogQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          const updatedBlogs = oldData.blogs.filter(
            blog => blog.id !== data.id
          );

          return {
            ...oldData,
            blogs: updatedBlogs,
            count: Math.max((oldData.count || 0) - 1, 0),
          };
        });
      });
    },
  });
};

// Add Comment to Blog
export const useAddBlogComment = () => {
  return useMutation({
    mutationFn: async ({ blogId, commentData }) => {
      const response = await fetch(`/api/blog/${blogId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add comment");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { blogId } = variables;
      
      // Invalidate single blog to refetch with new comment
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });
};

// Get Blogs by Category (specialized hook)
export const useBlogsByCategory = (category) => {
  return useQuery({
    queryKey: ["blogs", "category", category],
    queryFn: async () => {
      const response = await fetch(`/api/blog?category=${category}&status=published`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!category,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Recent Blogs
export const useRecentBlogs = (limit = 5) => {
  return useQuery({
    queryKey: ["blogs", "recent", limit],
    queryFn: async () => {
      const response = await fetch(`/api/blog?status=published&limit=${limit}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Search Blogs (if you want to add search functionality)
export const useSearchBlogs = (searchTerm) => {
  return useQuery({
    queryKey: ["blogs", "search", searchTerm],
    queryFn: async () => {
      const response = await fetch(`/api/blog?search=${encodeURIComponent(searchTerm)}&status=published`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!searchTerm && searchTerm.length > 2, // Only search if term is longer than 2 chars
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 1, // 1 minute for search results
  });
};

// Bulk Delete Blogs (Admin only)
export const useBulkDeleteBlogs = () => {
  return useMutation({
    mutationFn: async ({ ids }) => {
      const deletePromises = ids.map((id) =>
        fetch(`/api/blog/${id}`, { 
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAdmin: true }),
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to delete blog ${id}`);
          return res.json();
        })
      );
      
      const results = await Promise.all(deletePromises);
      return { ids, results };
    },
    onSuccess: (data) => {
      const { ids } = data;
      
      // Remove from individual blog caches
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: ["blog", id] });
      });
      
      // Update blogs list cache
      const queryCache = queryClient.getQueryCache();
      const blogQueries = queryCache.findAll({
        queryKey: ["blogs"]
      });

      blogQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          const updatedBlogs = oldData.blogs.filter(
            blog => !ids.includes(blog.id)
          );

          return {
            ...oldData,
            blogs: updatedBlogs,
            count: Math.max((oldData.count || 0) - ids.length, 0),
          };
        });
      });
    },
  });
};

// Update Blog Status (Admin only) - for draft/published status
export const useUpdateBlogStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const formData = new FormData();
      formData.append('status', status);
      formData.append('isAdmin', 'true');

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog status");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { id } = variables;
      
      // Invalidate single blog cache
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      
      // Invalidate all blogs queries to reflect status change
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
