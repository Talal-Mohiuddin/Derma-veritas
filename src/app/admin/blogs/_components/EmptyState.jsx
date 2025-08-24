export default function EmptyState({ onAddBlog }) {
  return (
    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
      <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Get started by creating your first blog post. Share your knowledge and engage with your audience.
      </p>
      <button
        onClick={onAddBlog}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Create Your First Blog</span>
      </button>
    </div>
  );
}
