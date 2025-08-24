"use client";
import { useState } from "react";
import {
  useBlogsData,
  useDeleteBlog,
  useUpdateBlogStatus,
} from "../../../hooks/useBlog";
import BlogForm from "./_components/BlogForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import EmptyState from "./_components/EmptyState";
import BlogCard from "./_components/BlogCard";
import { toast } from "sonner";

export default function BlogsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch blogs with filters
  const {
    data: blogsData,
    isLoading,
    error,
    refetch,
  } = useBlogsData(categoryFilter, statusFilter === "all" ? "" : statusFilter);

  const deleteblogMutation = useDeleteBlog();
  const updateStatusMutation = useUpdateBlogStatus();

  const blogs = blogsData?.blogs || [];

  const handleAddBlog = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteblogMutation.mutateAsync({ id: blogId });
      toast.success("Blog deleted successfully! 🗑️");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete blog. Please try again.");
    }
  };

  const handleToggleStatus = async (blogId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await updateStatusMutation.mutateAsync({ id: blogId, status: newStatus });
      toast.success(
        `Blog ${newStatus === "published" ? "published" : "unpublished"} successfully! ${
          newStatus === "published" ? "🚀" : "📝"
        }`
      );
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.message || "Failed to update blog status. Please try again.");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  const categories = ["Skincare", "Dermatology", "Beauty", "Health", "Tips"];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading blogs</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Management 📝</h1>
            <p className="text-purple-100 text-lg">
              Create and manage your blog content
            </p>
          </div>
          <button
            onClick={handleAddBlog}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add New Blog</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Total: {blogs.length} blogs</span>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <EmptyState onAddBlog={handleAddBlog} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
              onToggleStatus={handleToggleStatus}
              isUpdatingStatus={updateStatusMutation.isPending}
              isDeleting={deleteblogMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            refetch();
          }}
        />
      )}
    </div>
  );
}
