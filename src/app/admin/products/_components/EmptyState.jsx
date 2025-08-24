export default function EmptyState({ onAddProduct }) {
  return (
    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Get started by creating your first product. You can add product details, images, and manage inventory.
      </p>
      <button
        onClick={onAddProduct}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium inline-flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Your First Product</span>
      </button>
    </div>
  );
}
