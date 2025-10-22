import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from '../../component/Layout/Layout';
import { getSingleUser, updateAdminProfileInformation } from '../../api/authApi';
import AdminUserMenu from '../../component/UserLayout/AdminUserMenu';
import { useAuth } from '../../component/context/auth';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';


// Input Component
const InputField = ({ label, value, onChange, type = "text", required = false, disabled = false }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium dark:text-white ">{label}</label>
    <input
      value={value || ""}
      onChange={onChange}
      type={type}
      required={required}
      disabled={disabled}
      className={`w-full px-3 py-2 text-sm border rounded dark:text-white dark:bg-gray-900`}
    />
  </div>
);

// Select Component
const SelectField = ({ label, value, onChange, options = [] }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium dark:text-white">{label}</label>
    <select
      value={value || ""}
      onChange={onChange}
      className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-900 dark:text-white"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const AdminEditProfile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: {
      permanent: "",
      present: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await getSingleUser(auth?.user?._id || auth?.user?.id, auth?.token);
      const userData = res.data;

      setFormData({
        fullName: userData.fullName || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        dob: userData.dob || "",
        gender: userData.gender || "",
        address: {
          permanent: userData.address?.permanent || "",
          present: userData.address?.present || "",
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          country: userData.address?.country || "",
          zipCode: userData.address?.zipCode || "",
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth?.user && auth?.token) {
      loadUser();
    }
  }, [auth?.user, auth?.token]);

  const handleChange = (field) => (e) => {
    if (field.startsWith("address.")) {
      const key = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: e.target.value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleShowHide = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (changePassword) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
    }

    try {
      const { data } = await updateAdminProfileInformation(
        {
          ...formData,
          id: auth?.user?._id || auth?.user?.id,  
          password: changePassword ? password : undefined,
        },
        auth?.token
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        setPassword("");
        setConfirmPassword("");
        setChangePassword(false);

        toast.success("Profile updated successfully");
        navigate("/dashboard/admin");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
                <h3 className="bg-main-color text-white px-3 py-1 font-semibold mb-2 text-lg text-center">
                  Edit & Update Profile
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-white">
                  <InputField label="Full Name" value={formData.fullName} onChange={handleChange("fullName")} required />
                  <InputField label="Username" value={formData.username} disabled />
                  <InputField label="Email" value={formData.email} type="email" disabled />
                  <InputField label="Phone" value={formData.phone} onChange={handleChange("phone")} />
                  <InputField label="Date of Birth" value={formData.dob ? formData.dob.split("T")[0] : ""} type="date" onChange={handleChange("dob")} />
                  <SelectField label="Gender" value={formData.gender} onChange={handleChange("gender")} options={["Male", "Female", "Other"]} />

                  {/* Address Fields */}
                  <InputField label="Permanent Address" value={formData.address.permanent} onChange={handleChange("address.permanent")} />
                  <InputField label="Present Address" value={formData.address.present} onChange={handleChange("address.present")} />
                  <InputField label="City" value={formData.address.city} onChange={handleChange("address.city")} />
                  <InputField label="State" value={formData.address.state} onChange={handleChange("address.state")} />
                  <InputField label="Country" value={formData.address.country} onChange={handleChange("address.country")} />
                  <InputField label="Zip Code" value={formData.address.zipCode} onChange={handleChange("address.zipCode")} />

                  {/* Password change */}
                  <div className="col-span-full space-y-2">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={changePassword} onChange={(e) => setChangePassword(e.target.checked)} />
                      <span className="font-medium">Change Password</span>
                    </label>
                  </div>

                  {changePassword && (
                    <>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">New Password</label>
                        <div className="relative">
                          <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordType} className="w-full px-3 py-2 text-sm border rounded pr-10" />
                          <button type="button" onClick={handleShowHide} className="absolute top-2 right-3 text-gray-500">
                            {passwordType === "password" ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={passwordType} className="w-full px-3 py-2 text-sm border rounded pr-10" />
                          <button type="button" onClick={handleShowHide} className="absolute top-2 right-3 text-gray-500">
                            {passwordType === "password" ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-span-full">
                    <button type="submit" className="w-full py-2 bg-main-color text-white font-medium rounded hover:bg-main-hover transition">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminEditProfile;
