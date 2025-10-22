import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../component/Layout/Layout";
import AdminUserMenu from "../../component/UserLayout/AdminUserMenu";
import { useTheme } from "../../component/context/ThemeContext";
import { deleteContact, getContacts } from "../../api/contactApi";

const AdminContacts = () => {
  const { darkMode } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false);

  // Fetch contacts
  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await deleteContact(deleteId);
      toast.success("Message deleted successfully");
      setShowModal(false);
      setDeleteId(null);
      fetchContacts();
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  return (
    <Layout title="Telefect - Admin Contacts">
      <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen py-6`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/5">
              <AdminUserMenu />
            </div>

            {/* Main Content */}
            <div
              className={`w-full md:w-4/5 p-6 rounded-lg shadow ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr
                      className={`${
                        darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                      }`}
                    >
                      <th className="border p-3 text-left">Name</th>
                      <th className="border p-3 text-left">Email</th>
                      <th className="border p-3 text-left">Message</th>
                      <th className="border p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr
                        key={c._id}
                        className={`${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
                          }`}
                      >
                        <td className="border p-3">{c.fullName}</td>
                        <td className="border p-3">{c.email}</td>
                        <td className="border p-3">{c.message}</td>
                        <td className="border p-3 text-center">
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                            onClick={() => openDeleteModal(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Delete Confirmation Modal */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                  <div
                    className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center`}
                  >
                    <h2 className="text-xl font-bold mb-4 text-red-600">
                      Confirm Deletion
                    </h2>
                    <p className="mb-6">
                      Are you sure you want to delete this message? This action cannot
                      be undone.
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        onClick={confirmDelete}
                      >
                        Yes, Delete
                      </button>
                      <button
                        className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                        onClick={cancelDelete}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminContacts;
