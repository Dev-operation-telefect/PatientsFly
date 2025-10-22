 
const BlogViewModal = ({ blog, onClose }) => {
  if (!blog) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {/* Blog Details */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={blog.teamMember?.profilePicture || "/default-avatar.png"}
            alt={blog.teamMember?.fullName || "Author"}
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {blog.teamMember?.fullName || "Unknown"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {blog.isApproved ? "Approved" : "Pending"}
            </p>
          </div>
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-4">
          <p>{blog.content || "No description available"}</p>
        </div>

        {/* Blog Image */}
        {blog.image && (
          <div className="mb-4">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogViewModal;
