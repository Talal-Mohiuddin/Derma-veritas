"use client";

import { useState } from 'react';
import { toast } from "sonner";

export default function ProductCard({ 
  product, 
  onEdit, 
  onDelete, 
  onSelect, 
  isSelected, 
  isDeleting 
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelect = () => {
    onSelect(product.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100 border-red-300' };
    if (quantity < 10) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100 border-yellow-300' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-100 border-green-300' };
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const loadingToastId = toast.loading("Deleting product...");
    
    onDelete(product.id)
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

  const stockStatus = getStockStatus(product.stockQuantity);

  return (
    <>
      <div className={`bg-white rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 ${isSelected ? 'ring-2 ring-gray-500' : ''}`}>
        {/* Selection checkbox and image */}
        <div className="relative">
          <div className="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelect}
              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500 bg-white shadow-sm"
            />
          </div>
          
          <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                {product.category}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stockStatus.color}`}>
              {stockStatus.text}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            <div className="flex justify-between">
              <span>Stock:</span>
              <span className="font-medium">{product.stockQuantity} units</span>
            </div>
            {product.servingSize && (
              <div className="flex justify-between">
                <span>Serving:</span>
                <span className="font-medium">{product.servingSize}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg hover:from-gray-900 hover:to-black transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm font-medium disabled:opacity-50 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
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
