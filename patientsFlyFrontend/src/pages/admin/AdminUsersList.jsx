import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../component/context/auth';
import { deleteUser, fetchUsers, toggleBlockUser, toggleCanPost, toggleUserRole } from '../../api/adminUserApi';
import Layout from '../../component/Layout/Layout';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import Loader from '../../component/Loader';

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null); // "delete" | "block" | "canPost" | "promote"
  const [showModal, setShowModal] = useState(false);
  const [auth] = useAuth();

  // Load Users
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers(auth?.token);
      setUsers(data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Open confirmation modal
  const openModal = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowModal(true);
  };

  // Confirm Action
  const handleConfirmAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      if (actionType === 'delete') {
        await deleteUser(selectedUser._id, auth?.token);
        toast.success('User deleted successfully');
      } else if (actionType === 'block') {
        await toggleBlockUser(selectedUser._id, auth?.token);
        toast.success('User block status updated');
      } else if (actionType === 'canPost') {
        await toggleCanPost(selectedUser._id, auth?.token);
        toast.success('User blog permission updated');
      } else if (actionType === 'promote') {
        await toggleUserRole(selectedUser._id, auth?.token);
        toast.success('User role updated');
      }

      loadUsers();
    } catch {
      toast.error('Action failed');
    } finally {
      setShowModal(false);
      setSelectedUser(null);
      setActionType(null);
    }
  };

  return (
    <Layout title="Telefect - Admin Users List">
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/5">
              <AdminUserMenu />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-4/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                User Management
              </h1>

              {loading ? (
                <Loader />
              ) : (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                  <table className="w-full border-collapse text-gray-800 dark:text-gray-200">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                        <th className="p-3 border">Profile Pic</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Verified</th>
                        <th className="p-3 border">Role</th>
                        <th className="p-3 border">Blocked</th>
                        <th className="p-3 border">Can Post</th>
                        <th className="p-3 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user) => (
                        <tr
                          key={user._id}
                          className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <td className="p-3 border">
                            <img
                              src={user?.profilePicture}
                              alt="Profile"
                              className="w-10 h-10 rounded-full"
                            />
                          </td>
                          <td className="p-3 border">{user?.fullName}</td>
                          <td className="p-3 border">{user?.email}</td>
                          <td className="p-3 border">
                            {user?.isVerified ? 'Yes' : 'No'}
                          </td>
                          <td className="p-3 border">{user?.role}</td>
                          <td className="p-3 border">
                            {user?.isBlocked ? 'Yes' : 'No'}
                          </td>
                          <td className="p-3 border">
                            {user?.canPost ? 'Yes' : 'No'}
                          </td>
                          <td className="p-3 border flex gap-2 flex-wrap">
                            {/* Promote / Demote */}
                            <button
                              onClick={() => openModal(user, 'promote')}
                              className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded"
                            >
                              {user.role === 'admin' ? 'Promote' : 'Demote'}
                            </button>

                            {/* Block / Unblock */}
                            <button
                              onClick={() => openModal(user, 'block')}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                            >
                              {user.isBlocked ? 'Unblock' : 'Block'}
                            </button>

                            {/* Blog Permission */}
                            <button
                              onClick={() => openModal(user, 'canPost')}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                            >
                              {user.canPost ? 'Blog Post Off' : 'Blog Post On'}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => openModal(user, 'delete')}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {actionType === 'delete'
                ? 'Confirm Delete'
                : actionType === 'block'
                ? selectedUser?.isBlocked
                  ? 'Unblock User'
                  : 'Block User'
                : actionType === 'promote'
                ? selectedUser?.role === 'admin'
                  ? 'Promote Admin to SuperAdmin'
                  : 'Demote SuperAdmin to Admin'
                : 'Toggle Blog Permission'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to <b>{actionType}</b> for{' '}
              <span className="font-bold">{selectedUser?.fullName}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-white rounded ${
                  actionType === 'delete'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminUsersList;
