import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Layout from '../../component/Layout/Layout';
import Loader from '../../component/Loader';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { useAuth } from '../../component/context/auth';
import BlogFormModal from './popup/BlogFormModal';
import BlogDeleteConfirmModal from './popup/BlogDeleteConfirmModal';
import BlogViewModal from './popup/BlogViewModal';
import { deleteBlog, fetchAllBlogs, toggleBlogApproval } from '../../api/blogApi';

const AdminBlogPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [auth]=useAuth()

    const loadBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetchAllBlogs(auth?.token);
        setBlogs(res?.data);
      } catch (error) {
        console.log(error.response?.data?.message || "Failed to fetch blogs");
      }
      setLoading(false);
    };
  
    useEffect(() => {
      loadBlogs();
    }, []);
  
    const handleDelete = async () => {
      try {
        await deleteBlog(deleteId, auth?.token);
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter((b) => b._id !== deleteId));
        setShowDeleteModal(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    };

    return (
      <Layout title="Telefect - Admin Blog Posts">
        {loading && <Loader />}
            <div className='bg-gray-100 dark:bg-gray-800 min-h-screen py-6'>
                <div className='container mx-auto'>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="w-full md:w-1/5">
                            <AdminUserMenu />
                        </div>
                        {/* Main Content */}
                        <div className="w-full md:w-4/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                            <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                              <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
                                <button
                                  onClick={() => { setSelectedBlog(null); setShowForm(true); }}
                                  className="px-4 py-2 bg-main-color text-white rounded-lg hover:bg-main-hover"
                                >
                                  + Add Blog
                                </button>
                              </div>
                              <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
                                <table className="w-full text-left">
                                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <tr>
                                        <th className="p-3">Profile</th>
                                        <th className="p-3">Author</th>
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3 text-center">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {loading ? (
                                      <tr>
                                        <td colSpan="4" className="p-4 text-center text-gray-600 dark:text-gray-300">
                                          Loading blogs...
                                        </td>
                                      </tr>
                                    ) : blogs.length > 0 ? (
                                      blogs.map((blog) => (
                                        <tr key={blog._id} className="border-b dark:border-gray-700">
                                          <td className="p-3">
                                            <img
                                              src={blog.teamMember?.profilePicture || "/default-avatar.png"}
                                              alt={blog.teamMember?.fullName || "Author"}
                                              className="w-10 h-10 rounded-full object-cover border"
                                            />
                                          </td>
                                          <td className="p-3 text-gray-600 dark:text-gray-400">{blog.teamMember?.fullName || "Unknown"}</td>
                                          <td className="p-3 text-gray-600 dark:text-gray-400">{blog.title}</td>
                                          <td className="p-3">
                                            <span
                                              className={`px-2 py-1 text-sm rounded-full ${
                                                blog.isApproved ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                                              }`}
                                            >
                                              {blog.isApproved ? "Approved" : "Pending"}
                                            </span>
                                          </td>
                                          <td className="p-3 text-center flex gap-2 justify-center">
                                            <button
                                              onClick={() => { setSelectedBlog(blog); setShowViewModal(true); }}
                                              className="px-2 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                                            >
                                              View
                                            </button>
                                            <button
                                              onClick={() => { setSelectedBlog(blog); setShowForm(true); }}
                                              className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                              Edit
                                            </button>
                                            <button
                                              onClick={async () => {
                                                try {
                                                    const updatedBlog = await toggleBlogApproval(blog._id, auth?.token);
                                                    loadBlogs();
                                                    toast.success(`Blog ${updatedBlog.blog.isApproved ? "approved" : "unapproved"}`);
                                                } catch (error) {
                                                  toast.error(error.response?.data?.message || "Approval update failed");
                                                }
                                              }}
                                              className={`px-2 py-1 text-sm rounded ${
                                                blog.isApproved ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                                              } text-white`}
                                            >
                                              {blog.isApproved ? "Unapprove" : "Approve"}
                                            </button>
                                            <button
                                              onClick={() => { setDeleteId(blog._id); setShowDeleteModal(true); }}
                                              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="4" className="p-4 text-center text-gray-600 dark:text-gray-300">
                                          No blogs found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              {showForm && (
                                <BlogFormModal
                                  auth={auth}
                                  blog={selectedBlog}
                                  onClose={() => { setShowForm(false); loadBlogs(); }}
                                />
                              )}
                              {showDeleteModal && (
                                <BlogDeleteConfirmModal
                                  onConfirm={handleDelete}
                                  onCancel={() => setShowDeleteModal(false)}
                                />
                              )}
                              {showViewModal && (
                                <BlogViewModal
                                  blog={selectedBlog}
                                  onClose={() => setShowViewModal(false)}
                                />
                              )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminBlogPosts;