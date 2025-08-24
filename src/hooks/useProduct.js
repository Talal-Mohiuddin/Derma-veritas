import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";

// Get All Products
export const useProductsData = (
  category = "",
  page = 1,
  limit = 10
) => {
  return useQuery({
    queryKey: ["products", category, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (category) {
        params.append('category', category);
      }

      const response = await fetch(`/api/product?${params}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Get Single Product by ID
export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`/api/product/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!id, // Only run if id exists
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Create Product
export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (productData) => {
      const formData = new FormData();
      
      // Append all product fields
      Object.keys(productData).forEach(key => {
        if (key === 'images' && productData[key]) {
          // Handle multiple image files
          productData[key].forEach(file => {
            formData.append('images', file);
          });
        } else if (key === 'ingredients' && Array.isArray(productData[key])) {
          // Convert ingredients array to JSON string
          formData.append(key, JSON.stringify(productData[key]));
        } else if (productData[key] !== undefined && productData[key] !== null) {
          formData.append(key, productData[key]);
        }
      });

      const response = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      // Optionally add the new product to existing cache
      const queryCache = queryClient.getQueryCache();
      const productQueries = queryCache.findAll({
        queryKey: ["products"]
      });

      productQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            products: [data.product, ...oldData.products],
            total: (oldData.total || 0) + 1,
          };
        });
      });
    },
  });
};

// Update Product
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, productData }) => {
      const formData = new FormData();
      
      // Append all product fields
      Object.keys(productData).forEach(key => {
        if (key === 'images' && productData[key]) {
          // Handle multiple image files
          productData[key].forEach(file => {
            formData.append('images', file);
          });
        } else if (key === 'ingredients' && Array.isArray(productData[key])) {
          // Convert ingredients array to JSON string
          formData.append(key, JSON.stringify(productData[key]));
        } else if (productData[key] !== undefined && productData[key] !== null) {
          formData.append(key, productData[key]);
        }
      });

      const response = await fetch(`/api/product/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Update single product cache
      queryClient.setQueryData(["product", data.product.id], data);
      
      // Update products list cache
      const queryCache = queryClient.getQueryCache();
      const productQueries = queryCache.findAll({
        queryKey: ["products"]
      });

      productQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          const updatedProducts = oldData.products.map(product =>
            product.id === data.product.id ? data.product : product
          );

          return {
            ...oldData,
            products: updatedProducts,
          };
        });
      });
    },
  });
};

// Delete Product
export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      
      return { id, ...await response.json() };
    },
    onSuccess: (data) => {
      // Remove from single product cache
      queryClient.removeQueries({ queryKey: ["product", data.id] });
      
      // Update products list cache
      const queryCache = queryClient.getQueryCache();
      const productQueries = queryCache.findAll({
        queryKey: ["products"]
      });

      productQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          const updatedProducts = oldData.products.filter(
            product => product.id !== data.id
          );

          return {
            ...oldData,
            products: updatedProducts,
            total: Math.max((oldData.total || 0) - 1, 0),
          };
        });
      });
    },
  });
};

// Add Product Review
export const useAddProductReview = () => {
  return useMutation({
    mutationFn: async ({ productId, reviewData }) => {
      const response = await fetch(`/api/product/${productId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add review");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { productId } = variables;
      
      // Invalidate single product to refetch with new review
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      
      // Optionally update the cache directly
      queryClient.setQueryData(["product", productId], (oldData) => {
        if (!oldData) return oldData;

        const updatedProduct = {
          ...oldData.product,
          reviews: [...(oldData.product.reviews || []), data.review]
        };

        return {
          ...oldData,
          product: updatedProduct,
        };
      });
    },
  });
};

// Bulk Delete Products
export const useBulkDeleteProducts = () => {
  return useMutation({
    mutationFn: async ({ ids }) => {
      const deletePromises = ids.map((id) =>
        fetch(`/api/product/${id}`, { method: "DELETE" }).then(res => {
          if (!res.ok) throw new Error(`Failed to delete product ${id}`);
          return res.json();
        })
      );
      
      const results = await Promise.all(deletePromises);
      return { ids, results };
    },
    onSuccess: (data) => {
      const { ids } = data;
      
      // Remove from individual product caches
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: ["product", id] });
      });
      
      // Update products list cache
      const queryCache = queryClient.getQueryCache();
      const productQueries = queryCache.findAll({
        queryKey: ["products"]
      });

      productQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (oldData) => {
          if (!oldData) return oldData;

          const updatedProducts = oldData.products.filter(
            product => !ids.includes(product.id)
          );

          return {
            ...oldData,
            products: updatedProducts,
            total: Math.max((oldData.total || 0) - ids.length, 0),
          };
        });
      });
    },
  });
};

// Get Products by Category (specialized hook)
export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      const response = await fetch(`/api/product?category=${category}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!category,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Search Products (if you want to add search functionality)
export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: async () => {
      const response = await fetch(`/api/product?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!searchTerm && searchTerm.length > 2, // Only search if term is longer than 2 chars
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 1, // 1 minute for search results
  });
};
