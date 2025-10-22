const BlogDeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Are you sure you want to delete this blog? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDeleteConfirmModal;
