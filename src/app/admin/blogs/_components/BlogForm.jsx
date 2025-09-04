"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import { useCreateBlog, useUpdateBlog } from "../../../../hooks/useBlog";

export default function BlogForm({ blog, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
    coverImage: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();

  const isEditing = !!blog;
  const isLoading =
    createBlogMutation.isPending || updateBlogMutation.isPending;

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        category: blog.category || "",
        tags: blog.tags || [],
        status: blog.status || "draft",
        coverImage: null,
      });
      setPreviewImage(blog.coverImage || "");
    }
  }, [blog]);

  const categories = ["Skincare", "Dermatology", "Beauty", "Health", "Tips"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
        e.target.value = "";
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size too large. Maximum 5MB allowed.");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content: content || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      toast.error("Please fill in all required fields ⚠️");
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading(
      isEditing ? "Updating blog..." : "Creating blog..."
    );

    try {
      if (isEditing) {
        await updateBlogMutation.mutateAsync({
          id: blog.id,
          blogData: formData,
        });
        toast.dismiss(loadingToastId);
        toast.success("Blog updated successfully! ✅");
      } else {
        await createBlogMutation.mutateAsync(formData);
        toast.dismiss(loadingToastId);
        toast.success("Blog created successfully! 🎉");
      }
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.dismiss(loadingToastId);
      toast.error(
        error.message || "Something went wrong. Please try again. ❌"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isEditing ? "Edit Blog" : "Create New Blog"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter blog title..."
              required
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {previewImage ? (
                <div className="space-y-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage("");
                      setFormData((prev) => ({ ...prev, coverImage: null }));
                      // Reset file input
                      const fileInput =
                        document.querySelector('input[type="file"]');
                      if (fileInput) fileInput.value = "";
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      JPEG, PNG, WebP up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
              className="min-h-[400px]"
              showAbove={false}
            />
            <p className="text-sm text-gray-500 mt-2">
              Use the toolbar to format your content with headings, lists,
              links, and more.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading && (
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <span>{isEditing ? "Update Blog" : "Create Blog"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
