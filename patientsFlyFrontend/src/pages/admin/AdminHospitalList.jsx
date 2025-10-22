import { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import Loader from '../../component/Loader';
import HospitalFormModal from './popup/HospitalFormModal';
import toast from 'react-hot-toast';
import { deleteHospital, getHospitals } from '../../api/hospitalApi';

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Confirm Delete
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Are you sure you want to delete this hospital? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const AdminHospitalList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalId, setModalId] = useState(null); 
  const [deleteId, setDeleteId] = useState(null); // track delete target

  const load = async () => {
    try {
      const { data } = await getHospitals();
      setItems(data.hospitals || []);
    } catch (e) {
      toast.error("Failed to load hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteHospital(deleteId);
      toast.success("Deleted");
      load();
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
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

              {/* Main */}
              <div className="w-full md:w-4/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold dark:text-white">Hospitals</h1>
                    <button 
                      onClick={() => setModalId("")} 
                      className="px-4 py-2 rounded bg-red-600 text-white">
                      Add Hospital
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <p>No hospitals yet</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {items.map((h) => (
                        <div key={h._id} className="rounded-xl overflow-hidden shadow">
                          <div className="h-44 w-full bg-gray-100">
                            {h.image?.url && (
                              <img src={h.image.url} alt={h.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="bg-red-600 text-white p-5">
                            <h3 className="font-semibold text-lg text-center">{h.name}</h3>
                            <div className="flex justify-center items-center gap-2 opacity-90 mt-1 text-sm">
                              <span>📍</span>
                              <span>{h.country}{h.city ? `, ${h.city}` : ""}</span>
                            </div>
                            <div className="flex justify-center gap-3 mt-4">
                              <button 
                                onClick={() => setModalId(h._id)} 
                                className="bg-white text-black rounded-full px-5 py-2">
                                View / Edit
                              </button>
                              <button 
                                onClick={() => setDeleteId(h._id)} 
                                className="bg-black text-white rounded-full px-4 py-2">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hospital Modal */}
                  {modalId !== false && (
                    typeof modalId === "string" ? (
                      <HospitalFormModal
                        hospitalId={modalId || undefined}
                        onClose={() => setModalId(false)}
                        onSaved={() => { setModalId(false); load(); }}
                      />
                    ) : null
                  )}
                  {modalId === "" && (
                    <HospitalFormModal
                      hospitalId={undefined}
                      onClose={() => setModalId(false)}
                      onSaved={() => { setModalId(false); load(); }}
                    />
                  )}

                  {/* Delete Confirm Modal */}
                  {deleteId && (
                    <DeleteConfirmModal
                      onConfirm={confirmDelete}
                      onCancel={() => setDeleteId(null)}
                    />
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

export default AdminHospitalList;
