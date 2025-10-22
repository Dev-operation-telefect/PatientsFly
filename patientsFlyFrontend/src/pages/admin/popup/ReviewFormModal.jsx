import { useEffect, useState } from "react";
import { createReview, getReviewById, updateReview } from "../../../api/reviewApi";
import { toast } from "react-hot-toast";

export default function ReviewFormModal({ reviewId, onClose, onSaved }) {
  const isEdit = Boolean(reviewId);
  const empty = {
    name: "", email: "", address: "",
    text: "", rating: 5, optionalText: "",
    isActive: true, profilePic: null, image: null,
  };
  const [form, setForm] = useState(empty);
  const [previewProfile, setPreviewProfile] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (isEdit) {
      getReviewById(reviewId)
        .then(({ data }) => {
          const r = data.review || data; // support both response shapes
          setForm({ ...empty, ...r, profilePic: null, image: null });
          setPreviewProfile(r.profilePic || "");
          setPreviewImage(r.image || "");
        })
        .catch(() => toast.error("Failed to load review"));
    } else {
      setForm(empty);
      setPreviewProfile("");
      setPreviewImage("");
    }
  }, [reviewId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files?.[0]) {
      setForm((p) => ({ ...p, [name]: files[0] }));
      const url = URL.createObjectURL(files[0]);
      if (name === "profilePic") setPreviewProfile(url);
      if (name === "image") setPreviewImage(url);
    } else {
      setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined) fd.append(k, v);
      });

      if (isEdit) { await updateReview(reviewId, fd); toast.success("Review updated"); }
      else { await createReview(fd); toast.success("Review created"); }

      onSaved?.();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Review" : "Add Review"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            <input name="rating" type="number" min="0" max="5" step="0.5" value={form.rating} onChange={handleChange} placeholder="Rating" className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
          </div>
          <textarea name="text" value={form.text} onChange={handleChange} placeholder="Review text" className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
          <input name="optionalText" value={form.optionalText} onChange={handleChange} placeholder="Optional text" className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Profile Picture</label>
              {previewProfile && <img src={previewProfile} alt="" className="w-16 h-16 rounded-full object-cover mb-2" />}
              <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Optional Image</label>
              {previewImage && <img src={previewImage} alt="" className="w-20 h-20 rounded object-cover mb-2" />}
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"/>
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={!!form.isActive} onChange={handleChange}/>
            <span className="dark:text-white">Active</span>
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded">{isEdit ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
