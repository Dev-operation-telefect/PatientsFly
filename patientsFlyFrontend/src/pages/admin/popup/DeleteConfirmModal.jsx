const DeleteConfirmModal = ({
  title = "Confirm Delete",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <p className="text-sm opacity-80 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
