"use client";
import { useState } from "react";
import {
  useProductsData,
  useDeleteProduct,
  useBulkDeleteProducts,
} from "../../../hooks/useProduct";
import ProductForm from "./_components/ProductForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import EmptyState from "./_components/EmptyState";
import ProductCard from "./_components/ProductCard";
import { toast } from "sonner";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  // Fetch products with filters
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useProductsData(categoryFilter, currentPage, pageSize);

  const deleteProductMutation = useDeleteProduct();
  const bulkDeleteMutation = useBulkDeleteProducts();

  const products = productsData?.products || [];
  const totalProducts = productsData?.total || 0;

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductMutation.mutateAsync({ id: productId });
      toast.success("Product deleted successfully! 🗑️");
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete product. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return;

    const loadingToastId = toast.loading(`Deleting ${selectedProducts.length} products...`);

    try {
      await bulkDeleteMutation.mutateAsync({ ids: selectedProducts });
      toast.dismiss(loadingToastId);
      toast.success(`${selectedProducts.length} products deleted successfully! 🗑️`);
      setSelectedProducts([]);
    } catch (error) {
      console.error("Bulk delete error:", error);
      toast.dismiss(loadingToastId);
      toast.error(error.message || "Failed to delete products. Please try again. ❌");
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const categories = ["Cleanser", "Moisturizer", "Serum", "Sunscreen", "Treatment", "Supplements"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">Loading Products...</div>
          <div className="text-gray-500">Please wait while we fetch the data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading products</div>
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
            <h1 className="text-3xl font-bold mb-2">Product Management 📦</h1>
            <p className="text-purple-100 text-lg">
              Manage your product catalog and inventory
            </p>
          </div>
          <button
            onClick={handleAddProduct}
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
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
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
              <span>Total: {totalProducts} products</span>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={handleBulkDelete}
                disabled={bulkDeleteMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>{bulkDeleteMutation.isPending ? "Deleting..." : "Delete Selected"}</span>
              </button>
            </div>
          )}
        </div>

        {products.length > 0 && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={selectedProducts.length === products.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label className="ml-2 text-sm text-gray-600">
              Select all products on this page
            </label>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <EmptyState onAddProduct={handleAddProduct} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onSelect={handleSelectProduct}
              isSelected={selectedProducts.includes(product.id)}
              isDeleting={deleteProductMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalProducts > pageSize && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {Math.ceil(totalProducts / pageSize)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= Math.ceil(totalProducts / pageSize)}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
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
