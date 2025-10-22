import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAuth } from '../../component/context/auth';
import Layout from '../../component/Layout/Layout';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { getSingleUser, updateAdminProfilePicture } from '../../api/authApi';

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const loadUser = async () => {
    try {
      const res = await getSingleUser(auth?.user?.id, auth?.token);
      setUser(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth?.user?.id && auth?.token) {
      loadUser();
    }
  }, [auth?.user?.id, auth?.token]);
  const handleImageChange = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }
    setLoading(true);
    try {
      const response = await updateAdminProfilePicture(auth, image);
      if (response.success) {
        toast.success(response.message);
        const updatedAuthData = {
          ...auth,
          user: { ...response.user },
        };
        setAuth(updatedAuthData);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

  return (
    <Layout title="Telefect - Admin Dashboard">
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/5">
              <AdminUserMenu />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-4/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
                Welcome to your Admin Profile
              </h3>

              <div className="bg-white rounded shadow p-6 dark:bg-gray-800">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div className="relative">
                    <PhotoProvider>
                      <PhotoView src={user?.profilePicture || "/avatar.png"}>
                        <img
                          src={
                            image
                              ? URL.createObjectURL(image)
                              : user?.profilePicture || "/avatar.png"
                          }
                          alt={user?.fullName || "Profile"}
                          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                        />
                      </PhotoView>
                    </PhotoProvider>

                    {image && (
                      <button
                        onClick={() => setImage(null)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        title="Remove selected image"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <form
                    onSubmit={handleImageChange}
                    className="flex flex-col sm:flex-row items-center gap-3"
                  >
                    <label
                      htmlFor="file"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                    >
                      <span>Select Image</span>
                      <input
                        type="file"
                        id="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 2 * 1024 * 1024) {
                            toast.error("File size exceeds 2MB");
                            return;
                          }
                          setImage(file);
                        }}
                        accept="image/*"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-4 py-2 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-main-color hover:bg-main-hover"
                      } text-white rounded text-sm`}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Supported formats: JPG, JPEG, PNG. Max size: 2 MB.
                  </p>
                </div>

                {/* Profile Info */}
                <h2 className="bg-main-color text-white px-3 py-1 font-semibold mb-2">
                  Personal Information:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 dark:text-gray-300">
                  {[
                    ["Full Name", user?.fullName || "N/A"],
                    ["Username", user?.username || "N/A"],
                    ["Email", user?.email || "N/A"],
                    ["Phone", user?.phone || "N/A"],
                    ["Gender", user?.gender || "N/A"],
                    [
                      "Date of Birth",
                      auth?.user?.dob
                        ? new Date(user?.dob).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A",
                    ],
                    ["Present Address", user?.address?.present || "N/A"],
                    ["Permanent Address", user?.address?.permanent || "N/A"],
                    ["city", user?.address?.city || "N/A"],
                    ["state ", user?.address?.state || "N/A"],
                    ["country ", user?.address?.country || "N/A"],
                    ["zipCode ", user?.address?.zipCode || "N/A"],
                    ["role", user?.role || "N/A"],
                    ["Post eligible", user?.canPost || "N/A"],
                    ["Verified", user?.isVerified ? "Yes" : "No"],
                    [
                      "Created At",
                      user?.createdAt
                        ? new Date(user?.createdAt).toLocaleDateString()
                        : "N/A",
                    ],
                    [
                      "Last Updated",
                      user?.updatedAt
                        ? new Date(user?.updatedAt).toLocaleDateString()
                        : "N/A",
                    ],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-semibold text-gray-600 dark:text-gray-400">
                        {label}
                      </span>
                      <span className="text-gray-800 dark:text-gray-100">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    to="/dashboard/admin/edit-profile"
                    className="inline-block px-6 py-2.5 bg-main-color text-white text-sm font-medium rounded-md shadow hover:bg-main-hover focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
