import { useEffect, useState } from "react";
import { createHospital, getHospitalById, updateHospital } from "../../../api/hospitalApi";
import { toast } from "react-hot-toast";
import Loader from "../../../component/Loader";

export default function HospitalFormModal({ hospitalId, onClose, onSaved }) {
  const isEdit = Boolean(hospitalId);
  const empty = {
    name: "",
    country: "",
    city: "",
    address: "",
    description: "",
    specialties: "", // comma separated
    phone: "",
    email: "",
    website: "",
  };

  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (isEdit) {
      getHospitalById(hospitalId).then(({ data }) => {
        const h = data.hospital;
        setForm({
          name: h.name || "",
          country: h.country || "",
          city: h.city || "",
          address: h.address || "",
          description: h.description || "",
          specialties: (h.specialties || []).join(", "),
          phone: h.phone || "",
          email: h.email || "",
          website: h.website || "",
        });
        setPreview(h.image?.url || "");
      }).catch(() => toast.error("Failed to load hospital"));
    } else {
      setForm(empty);
      setFile(null);
      setPreview("");
    }
  }, [hospitalId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setPreview(URL.createObjectURL(f));
  };
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);

      if (isEdit) {
        await updateHospital(hospitalId, fd);
        toast.success("Hospital updated");
      } else {
        setLoading(true);
        await createHospital(fd);
        setLoading(false);
        toast.success("Hospital created");
      }
      onSaved?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Save failed");
    }
  };



  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader /></div>}
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Hospital" : "Add Hospital"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
          </div>

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="specialties" value={form.specialties} onChange={handleChange} placeholder="Specialties (comma separated)" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
          </div>

          <div className="flex items-center gap-4">
            <input type="file" accept="image/*" onChange={handleFile} />
            {preview ? (
              <img src={preview} alt="preview" className="h-16 w-24 object-cover rounded" />
            ) : (
              <span className="text-sm text-gray-500">No image selected</span>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded">{isEdit ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
