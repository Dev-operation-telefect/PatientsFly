import { useEffect, useState } from "react";
import { getCompanies, deleteCompany } from "../../api/companyApi";
import AdminUserMenu from "../../component/UserLayout/AdminUserMenu";
import Loader from "../../component/Loader";
import Layout from "../../component/Layout/Layout";
import toast from "react-hot-toast";
import CompanyFormModal from "./popup/CompanyFormModal";
import { useTheme } from "../../component/context/ThemeContext";

const AdminCompany = () => {
  const { darkMode } = useTheme();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showView, setShowView] = useState(false);

  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res?.data?.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await deleteCompany(deleteId);
      toast.success("Company deleted successfully");
      setShowDelete(false);
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Failed to delete company");
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout title="Telefect - Admin Company Management">
      <div className={`bg-gray-100 ${darkMode ? "dark:bg-gray-800" : ""} min-h-screen py-6`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/5">
              <AdminUserMenu />
            </div>

            {/* Main Content */}
            <div className={`w-full md:w-4/5 ${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
              <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Company Information</h1>
                <button
                  onClick={() => {
                    setSelectedCompany(null);
                    setShowForm(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  + Add Company
                </button>
              </div>

              <table className={`w-full border rounded-lg shadow-sm ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <thead className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className={darkMode ? "bg-gray-800 text-gray-100" : ""}>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <tr key={company._id} className={`border-t ${darkMode ? "border-gray-700" : ""}`}>
                        <td className="p-3">{company.name}</td>
                        <td className="p-3">{company.email}</td>
                        <td className="p-3">{company.phone}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowView(true);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowForm(true);
                            }}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(company._id);
                              setShowDelete(true);
                            }}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-3 text-center">
                        No companies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Add/Edit Form Popup */}
              {showForm && (
                <CompanyFormModal
                  company={selectedCompany}
                  onClose={() => setShowForm(false)}
                  onSuccess={() => {
                    fetchCompanies();
                    setShowForm(false);
                  }}
                />
              )}

              {/* Delete Confirmation Popup */}
              {showDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className={`p-6 rounded-xl shadow-lg w-96 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}`}>
                    <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                    <p className="mb-6">Are you sure you want to delete this company?</p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowDelete(false)}
                        className={`px-4 py-2 rounded ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"}`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* View Company Popup */}
              {showView && selectedCompany && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className={`p-6 rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}`}>
                    <h2 className="text-xl font-semibold mb-4">{selectedCompany.name}</h2>

                    <div className="space-y-2">
                      <p><strong>Tagline:</strong> {selectedCompany.tagline || "-"}</p>
                      <p><strong>Description:</strong> {selectedCompany.description || "-"}</p>
                      <p><strong>Email:</strong> {selectedCompany.email || "-"}</p>
                      <p><strong>Phone:</strong> {selectedCompany.phone || "-"}</p>
                      <p><strong>Website:</strong> {selectedCompany.website || "-"}</p>
                      {selectedCompany.logo && (
                        <p>
                          <strong>Logo:</strong> <img src={selectedCompany.logo} alt="logo" className="h-16 mt-1" />
                        </p>
                      )}

                      <h3 className="font-semibold mt-4">Address</h3>
                      <p>{selectedCompany.address?.street || ""} {selectedCompany.address?.city || ""}</p>
                      <p>{selectedCompany.address?.state || ""}, {selectedCompany.address?.country || ""}</p>
                      <p>{selectedCompany.address?.postalCode || ""}</p>

                      <h3 className="font-semibold mt-4">Social Links</h3>
                      <p>Facebook: {selectedCompany.socialLinks?.facebook || "-"}</p>
                      <p>Twitter: {selectedCompany.socialLinks?.twitter || "-"}</p>
                      <p>LinkedIn: {selectedCompany.socialLinks?.linkedin || "-"}</p>
                      <p>Instagram: {selectedCompany.socialLinks?.instagram || "-"}</p>
                      <p>YouTube: {selectedCompany.socialLinks?.youtube || "-"}</p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setShowView(false)}
                        className={`px-4 py-2 rounded ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"}`}
                      >
                        Close
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

export default AdminCompany;
