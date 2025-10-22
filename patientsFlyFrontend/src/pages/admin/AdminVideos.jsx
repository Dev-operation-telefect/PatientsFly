import toast from 'react-hot-toast';
import { createVideo, deleteVideo, getVideos, updateVideo } from '../../api/videoApi';
import { useTheme } from '../../component/context/ThemeContext';
import Layout from '../../component/Layout/Layout';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { useEffect, useState } from 'react';

const AdminVideos = () => {
  const { darkMode } = useTheme();

  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    thumbnail: "",
    userImage: "",
    userName: "",
    userLocation: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchVideos = async () => {
    try {
      const { data } = await getVideos();
      setVideos(data);
    } catch (err) {
      toast.error("Failed to fetch videos");
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateVideo(editingId, formData);
        toast.success("Video updated successfully");
      } else {
        await createVideo(formData);
        toast.success("Video created successfully");
      }
      setFormData({ thumbnail: "", userImage: "", userName: "", userLocation: "", date: "" });
      setEditingId(null);
      fetchVideos();
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (video) => {
    setFormData({
      thumbnail: video.thumbnail,
      userImage: video.userImage,
      userName: video.userName,
      userLocation: video.userLocation,
      date: video.date.split("T")[0],
    });
    setEditingId(video._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteVideo(id);
      toast.success("Video deleted successfully");
      fetchVideos();
    }
  };

  return (
    <Layout title="Admin - Videos" description="Manage videos" className="min-h-screen">
      <div className={'bg-gray-100 dark:bg-gray-800 min-h-screen py-6'}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/5">
              <AdminUserMenu />
            </div>

            {/* Main Content */}
            <div className={`w-full md:w-4/5 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              
              {/* Form Section */}
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">{editingId ? "Edit Video" : "Add Video"}</h2>
              <form className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.thumbnail}
                  onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="User Image URL"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.userImage}
                  onChange={e => setFormData({ ...formData, userImage: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="User Name"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.userName}
                  onChange={e => setFormData({ ...formData, userName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="User Location"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.userLocation}
                  onChange={e => setFormData({ ...formData, userLocation: e.target.value })}
                />
                <input
                  type="date"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-3 rounded-md font-medium"
                >
                  {editingId ? "Update Video" : "Create Video"}
                </button>
              </form>

              {/* Videos Table */}
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Videos List</h2>
              <div className="overflow-x-auto rounded-md shadow-md">
                <table className="min-w-full border-collapse table-auto dark:text-white">
                  <thead className={`${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200'}`}>
                    <tr>
                      <th className="p-3 border">Thumbnail</th>
                      <th className="p-3 border">User</th>
                      <th className="p-3 border">Location</th>
                      <th className="p-3 border">Date</th>
                      <th className="p-3 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map(video => (
                      <tr key={video._id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <td className="p-3 border">
                          <img src={video.thumbnail} alt="" className="w-24 h-14 object-cover rounded-md" />
                        </td>
                        <td className="p-3 border flex items-center gap-2">
                          {video.userImage && <img src={video.userImage} alt="" className="w-10 h-10 rounded-full object-cover" />}
                          {video.userName}
                        </td>
                        <td className="p-3 border">{video.userLocation}</td>
                        <td className="p-3 border">{new Date(video.date).toLocaleDateString()}</td>
                        <td className="p-3 border flex gap-2">
                          <button
                            onClick={() => handleEdit(video)}
                            className="bg-yellow-500 hover:bg-yellow-600 transition-colors px-3 py-1 rounded-md text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(video._id)}
                            className="bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded-md text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminVideos;
