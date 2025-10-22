import { useState, useEffect } from 'react';
import Layout from '../../component/Layout/Layout';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';

const AdminTeammates = () => {
  const [loading, setLoading] = useState(false);
  const [teammates, setTeammates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  const fetchTeammates = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/teammates`);
      const data = await res.json();
      if (res.ok) setTeammates(data);
    } catch { toast.error("Server error"); }
  };

  useEffect(() => { fetchTeammates(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teammate?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/teammates/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) setTeammates(teammates.filter(t => t._id !== id));
      toast.success(result.message);
    } catch { toast.error("Server error"); }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/teammates/upload-photo`, { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) { setPhotoURL(data.url); toast.success("Photo uploaded"); }
    } catch { toast.error("Upload failed"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        name: form.name.value,
        email: form.email.value,
        role: form.role.value,
        department: form.department.value,
        phone: form.phone.value,
        joiningDate: form.joiningDate.value,
        skills: form.skills.value,
        photo: photoURL,
        addedBy: "Admin",
    };

    try {
      let res, result;
      if (edit) {
        res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/teammates/${edit._id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        });
        result = await res.json();
        if (res.ok) setTeammates(teammates.map(t => t._id === result._id ? result : t));
      } else {
        res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/air-ambulance/v1/teammates`, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        });
        result = await res.json();
        if (res.ok) setTeammates([result, ...teammates]);
      }
      setShowForm(false); setEdit(null); setPhotoURL("");
    } catch { toast.error("Server error"); }
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
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Team Members</h2>
                <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded" onClick={() => { setShowForm(true); setEdit(null); }}>Add Teammate</button>
          
                <table className="min-w-full border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b">Photo</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Role</th>
                      <th className="py-2 px-4 border-b">Department</th>
                      <th className="py-2 px-4 border-b">Skills</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teammates.map(t => (
                      <tr key={t._id} className="bg-white text-gray-800 border-b">
                        <td className="py-2 px-4"><img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full" /></td>
                        <td className="py-2 px-4">{t.name}</td>
                        <td className="py-2 px-4">{t.email}</td>
                        <td className="py-2 px-4">{t.role}</td>
                        <td className="py-2 px-4">{t.department}</td>
                        <td className="py-2 px-4">{t.skills?.join(", ")}</td>
                        <td className="py-2 px-4 flex gap-2">
                          <button onClick={() => setSelected(t)} className="bg-blue-600 text-white px-3 py-1 rounded">View</button>
                          <button onClick={() => { setEdit(t); setShowForm(true); setPhotoURL(t.photo); }} className="bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                          <button onClick={() => handleDelete(t._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          
                {/* View Modal */}
                {selected && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                      <img src={selected.photo} alt={selected.name} className="w-24 h-24 rounded-full mb-2" />
                      <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
                      <p><strong>Email:</strong> {selected.email}</p>
                      <p><strong>Role:</strong> {selected.role}</p>
                      <p><strong>Department:</strong> {selected.department}</p>
                      <p><strong>Skills:</strong> {selected.skills?.join(", ")}</p>
                      <p><strong>Phone:</strong> {selected.phone}</p>
                      <button onClick={() => setSelected(null)} className="mt-4 w-full py-2 bg-red-600 text-white rounded">Close</button>
                    </div>
                  </div>
                )}
          
                {/* Add/Edit Form Modal */}
                {showForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                      <h3 className="text-xl font-bold mb-4">{edit ? "Edit Teammate" : "Add Teammate"}</h3>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <input name="name" defaultValue={edit?.name || ""} placeholder="Name" className="w-full border px-3 py-2 rounded" required />
                        <input name="email" type="email" defaultValue={edit?.email || ""} placeholder="Email" className="w-full border px-3 py-2 rounded" required />
                        <input name="role" defaultValue={edit?.role || ""} placeholder="Role" className="w-full border px-3 py-2 rounded" required />
                        <input name="department" defaultValue={edit?.department || ""} placeholder="Department" className="w-full border px-3 py-2 rounded" />
                        <input name="phone" defaultValue={edit?.phone || ""} placeholder="Phone" className="w-full border px-3 py-2 rounded" />
                        <input name="joiningDate" type="date" defaultValue={edit?.joiningDate ? new Date(edit.joiningDate).toISOString().split("T")[0] : ""} className="w-full border px-3 py-2 rounded" />
                        <input name="skills" defaultValue={edit?.skills?.join(", ") || ""} placeholder="Skills (comma separated)" className="w-full border px-3 py-2 rounded" />
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full border px-3 py-2 rounded" />
                        {photoURL && <img src={photoURL} alt="Preview" className="w-20 h-20 rounded-full mt-2" />}
                        <div className="flex gap-2 justify-end">
                          <button type="button" onClick={() => { setShowForm(false); setEdit(null); setPhotoURL(""); }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{edit ? "Update" : "Add"}</button>
                        </div>
                      </form>
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

export default AdminTeammates;
