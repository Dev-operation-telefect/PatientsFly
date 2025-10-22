import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from '../../component/Layout/Layout';
import { getSingleUser, updateAdminProfileInformation } from '../../api/authApi';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { useAuth } from '../../component/context/auth';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import { useTheme } from '../../component/context/ThemeContext';
import { useLanguage } from '../../component/context/useLanguage';



const AdminBookings = () => {
  const [loading, setLoading] = useState(false);
   const { darkMode } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // Appointment selected for deletion

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/appointments`);
      const data = await res.json();
      if (res.ok) setAppointments(data);
      else toast.error("Failed to fetch appointments");
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/appointments/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        setAppointments((prev) => prev.filter((a) => a._id !== deleteTarget._id));
      } else toast.error(result.message || "Failed to delete");
    } catch (err) {
      toast.error("Server error!");
    } finally {
      setDeleteTarget(null);
    }
  };

   
  return (
    <Layout title="Telefect - Admin Edit Profile">
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-gray-100 dark:bg-gray-800 min-h-screen py-6'>
          <div className='container mx-auto'>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div className="w-full md:w-1/5">
                <AdminUserMenu />
              </div>

              {/* Main Content */}
              <div className="w-full md:w-4/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
       

                <div className="max-w-7xl mx-auto p-6">
                  <h2 className="text-2xl font-semibold mb-6 dark:text-white">Appointments Management</h2>
                  {appointments.length === 0 ? (
                    <p className="text-gray-500">No appointments available.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className={`min-w-full border ${darkMode ? "border-gray-700" : "border-gray-200"} text-left`}>
                        <thead className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"}`}>
                          <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Location</th>
                            <th className="py-2 px-4 border-b">Destination</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((a) => (
                            <tr
                              key={a._id}
                              className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} border-b`}
                            >
                              <td className="py-2 px-4">{a.fullName}</td>
                              <td className="py-2 px-4">{a.email}</td>
                              <td className="py-2 px-4">{a.phone}</td>
                              <td className="py-2 px-4">{a.location}</td>
                              <td className="py-2 px-4">{a.destination}</td>
                              <td className="py-2 px-4 flex gap-2">
                                <button
                                  onClick={() => setSelectedAppointment(a)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => setDeleteTarget(a)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
            
                  {/* View Modal */}
                  {selectedAppointment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full`}>
                        <h3 className="text-xl font-bold mb-4">Appointment Details</h3>
                        <p><span className="font-semibold">Name:</span> {selectedAppointment.fullName}</p>
                        <p><span className="font-semibold">Email:</span> {selectedAppointment.email}</p>
                        <p><span className="font-semibold">Phone:</span> {selectedAppointment.phone}</p>
                        <p><span className="font-semibold">Current Location:</span> {selectedAppointment.location}</p>
                        <p><span className="font-semibold">Destination:</span> {selectedAppointment.destination}</p>
                        <p><span className="font-semibold">Message:</span> {selectedAppointment.message}</p>
                        <button
                          onClick={() => setSelectedAppointment(null)}
                          className="mt-4 w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
            
                  {/* Delete Confirmation Modal */}
                  {deleteTarget && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full`}>
                        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete the appointment of <span className="font-semibold">{deleteTarget.fullName}</span>?</p>
                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            onClick={() => setDeleteTarget(null)}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminBookings;
