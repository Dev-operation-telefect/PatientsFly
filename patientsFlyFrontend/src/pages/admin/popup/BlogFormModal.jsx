import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../../component/Loader";
import { createBlog, updateBlog } from "../../../api/blogApi";
import { useToast } from "../../../component/context/toast";
import { useLanguage } from "../../../component/context/useLanguage";

const BlogFormModal = ({ auth, blog, onClose }) => {
    console.log(auth?.user?.id)
  const [formData, setFormData] = useState({
    title: "",
    // slug: "",
    content: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    teamMember: auth?.user?.id,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        // slug: blog.slug,
        content: blog.content,
        tags: blog.tags?.join(", ") || "",
        metaTitle: blog.seo?.metaTitle || "",
        metaDescription: blog.seo?.metaDescription || "",
        metaKeywords: blog.seo?.metaKeywords?.join(", ") || ""
      });
    }
  }, [blog]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImages(e.target.files);
  const [loading, setLoading] = useState(false);
  const { show } = useToast(); 
  const { t } = useLanguage("en");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("teamMember", auth?.user?.id);
    data.append("title", formData.title);
    // data.append("slug", formData.slug);
    data.append("content", formData.content);
    data.append("tags", formData.tags.split(","));
    data.append("seo[metaTitle]", formData.metaTitle);
    data.append("seo[metaDescription]", formData.metaDescription);
    data.append("seo[metaKeywords]", formData.metaKeywords.split(","));

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }
    try {
      
      if (blog) {
        setLoading(true);
        await updateBlog(blog._id, data, auth?.token);
        toast.success("Blog updated successfully");
      } else {
        setLoading(true);
        await createBlog(data, auth?.token);
        toast.success("Blog created successfully");
        show({
          title: t("blogCreatedSuccessfully"),
          description: t("yourActionCompleted"),
          variant: "success",
        })
      }
      onClose();
      setLoading(false);
    } catch (error) {
      show({
          title: error.response?.data?.message || t("blogSaveFailed"),
          description: t("yourActionFailed"),
          variant: "error",
        })
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {loading && <Loader />}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          {blog ? "Edit Blog" : "Create Blog"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
          {/* <input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required /> */}
          <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
          <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input name="metaTitle" placeholder="Meta Title" value={formData.metaTitle} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input name="metaDescription" placeholder="Meta Description" value={formData.metaDescription} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input name="metaKeywords" placeholder="Meta Keywords (comma separated)" value={formData.metaKeywords} onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="file" multiple onChange={handleImageChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
            <button type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
