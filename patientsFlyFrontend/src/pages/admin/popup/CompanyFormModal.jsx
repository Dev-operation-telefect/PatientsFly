import { useState, useEffect } from "react";
import {
  createCompany,
  getCompanyById,
  updateCompany,
} from "../../../api/companyApi";
import { toast } from "react-hot-toast";

const CompanyFormModal = ({ company, onClose, onSuccess }) => {
  // Initialize all fields including nested objects
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    logo: "",
    address: {
      country: "",
      state: "",
      city: "",
      street: "",
      postalCode: "",
    },
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      youtube: "",
    },
  });

  const isEdit = Boolean(company?._id);

// Fetch data when editing
useEffect(() => {
  if (isEdit && company?._id) {
    getCompanyById(company._id).then(({ data }) => {
      setFormData({
        name: data?.company?.name || "",
        tagline: data?.company?.tagline || "",
        description: data?.company?.description || "",
        email: data?.company?.email || "",
        phone: data?.company?.phone || "",
        website: data?.company?.website || "",
        logo: data?.company?.logo || "",
        address: {
          country: data?.company?.address?.country || "",
          state: data?.company?.address?.state || "",
          city: data?.company?.address?.city || "",
          street: data?.company?.address?.street || "",
          postalCode: data?.company?.address?.postalCode || "",
        },
        socialLinks: {
          facebook: data?.company?.socialLinks?.facebook || "",
          twitter: data?.company?.socialLinks?.twitter || "",
          linkedin: data?.company?.socialLinks?.linkedin || "",
          instagram: data?.company?.socialLinks?.instagram || "",
          youtube: data?.company?.socialLinks?.youtube || "",
        },
      });
    }).catch(err => {
      console.error("Failed to fetch company:", err);
    });
  }
}, [company?._id, isEdit]);


  // Top-level change handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Nested address change
  const handleAddressChange = (e) =>
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });

  // Nested socialLinks change
  const handleSocialChange = (e) =>
    setFormData({
      ...formData,
      socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateCompany(company._id, formData);
        toast.success("Company updated successfully");
      } else {
        await createCompany(formData);
        toast.success("Company created successfully");
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving company:", error);
      toast.error("Failed to save company");
    }
  };
console.log(formData);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {isEdit ? "Edit Company" : "Add Company"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Company Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="tagline"
              placeholder="Tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="logo"
              placeholder="Logo URL"
              value={formData.logo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Address */}
          <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-200">
            Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="country"
              placeholder="Country"
              value={formData.address?.country || ""}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="state"
              placeholder="State"
              value={formData.address?.state || ""}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="city"
              placeholder="City"
              value={formData.address?.city || ""}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="street"
              placeholder="Street"
              value={formData.address?.street || ""}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.address?.postalCode || ""}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Social Links */}
          <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-200">
            Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="facebook"
              placeholder="Facebook URL"
              value={formData.socialLinks?.facebook || ""}
              onChange={handleSocialChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="twitter"
              placeholder="Twitter URL"
              value={formData.socialLinks?.twitter || ""}
              onChange={handleSocialChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.socialLinks?.linkedin || ""}
              onChange={handleSocialChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="instagram"
              placeholder="Instagram URL"
              value={formData.socialLinks?.instagram || ""}
              onChange={handleSocialChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
            <input
              name="youtube"
              placeholder="YouTube URL"
              value={formData.socialLinks?.youtube || ""}
              onChange={handleSocialChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyFormModal;
