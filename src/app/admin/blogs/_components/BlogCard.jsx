"use client";

import { useState } from 'react';
import { toast } from "sonner";

export default function BlogCard({ 
  blog, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  isUpdatingStatus, 
  isDeleting 
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const loadingToastId = toast.loading("Deleting blog...");
    
    onDelete(blog.id)
      .then(() => {
        toast.dismiss(loadingToastId);
        setShowDeleteModal(false);
      })
      .catch(() => {
        toast.dismiss(loadingToastId);
        setShowDeleteModal(false);
      });
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          {/* Status Badge */}
          <div className="flex justify-between items-start mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              blog.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {blog.status === 'published' ? '🟢 Published' : '🟡 Draft'}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(blog.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>

          {/* Category */}
          <p className="text-sm text-purple-600 font-medium mb-2">
            {blog.category}
          </p>

          {/* Content Preview */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {truncateContent(blog.content.replace(/<[^>]*>/g, ''))}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {blog.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{blog.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(blog)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
            
            <button
              onClick={() => onToggleStatus(blog.id, blog.status)}
              disabled={isUpdatingStatus}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                blog.status === 'published'
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {isUpdatingStatus ? 'Updating...' : (
                blog.status === 'published' ? 'Unpublish' : 'Publish'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Blog Post
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
