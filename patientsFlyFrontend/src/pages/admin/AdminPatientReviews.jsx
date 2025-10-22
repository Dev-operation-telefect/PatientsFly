import { useState, useEffect } from 'react';
import Layout from '../../component/Layout/Layout';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import {  deleteAllReviews, deleteReview, getReviews } from '../../api/reviewApi';
import ReviewFormModal from './popup/ReviewFormModal';
import DeleteConfirmModal from './popup/DeleteConfirmModal';

const AdminPatientReviews = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalId, setModalId] = useState(null); // "" -> create, string -> edit, null -> closed
    const [deleteId, setDeleteId] = useState(null);
    const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  
    const load = async () => {
      try {
        const { data } = await getReviews();
        setItems(data.reviews || []);
      } catch {
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => { load(); }, []);
  
    const confirmDelete = async () => {
      try {
        await deleteReview(deleteId);
        toast.success("Deleted");
        load();
      } catch {
        toast.error("Delete failed");
      } finally {
        setDeleteId(null);
      }
    };
  
    const confirmDeleteAll = async () => {
      try {
        await deleteAllReviews();
        toast.success("All reviews deleted");
        load();
      } catch {
        toast.error("Delete all failed");
      } finally {
        setDeleteAllOpen(false);
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

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold dark:text-white">Patient Reviews</h1>
                    <div className="flex gap-2">
                      <button onClick={() => setModalId("")} className="px-4 py-2 rounded bg-main-color text-white">Add Review</button>
                      <button onClick={() => setDeleteAllOpen(true)} className="px-4 py-2 rounded bg-red-600 text-white">Delete All</button>
                    </div>
                  </div>
            
                  {loading ? (
                    <p>Loading…</p>
                  ) : items.length === 0 ? (
                    <p>No reviews yet</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:text-white">
                      {items.map((r) => (
                        <div key={r._id} className="rounded-xl overflow-hidden shadow bg-white dark:bg-gray-900">
                          <div className="p-4 flex items-center gap-3">
                            <img src={r.profilePic} alt="" className="w-12 h-12 rounded-full object-cover bg-gray-100" />
                            <div>
                              <div className="font-semibold">{r.name}</div>
                              <div className="text-sm opacity-70">{r.email}</div>
                            </div>
                            <div className="ml-auto text-sm">⭐ {r.rating}</div>
                          </div>
                          <div className="px-4 pb-4">
                            {r.image && <img src={r.image} alt="" className="w-full h-36 object-cover rounded mb-3" />}
                            <div className="text-sm opacity-80">{r.address}</div>
                            <p className="mt-2">{r.text}</p>
                            {r.optionalText && <p className="mt-1 text-sm opacity-70">{r.optionalText}</p>}
                            <div className="flex justify-end gap-2 mt-4">
                              <button onClick={() => setModalId(r._id)} className="px-3 py-1 rounded bg-gray-200">Edit</button>
                              <button onClick={() => setDeleteId(r._id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
            
                  {/* Create/Edit Modal */}
                  {modalId !== null && (
                    <ReviewFormModal
                      reviewId={modalId || undefined}
                      onClose={() => setModalId(null)}
                      onSaved={() => { setModalId(null); load(); }}
                    />
                  )}
            
                  {/* Delete One */}
                  {deleteId && (
                    <DeleteConfirmModal
                      onConfirm={confirmDelete}
                      onCancel={() => setDeleteId(null)}
                    />
                  )}
            
                  {/* Delete All */}
                  {deleteAllOpen && (
                    <DeleteConfirmModal
                      title="Delete ALL reviews?"
                      message="This will permanently delete every review."
                      onConfirm={confirmDeleteAll}
                      onCancel={() => setDeleteAllOpen(false)}
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

export default AdminPatientReviews;
