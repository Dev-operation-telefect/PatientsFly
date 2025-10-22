import axios from "axios";

const API = import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/blog";

// Create blog
export const createBlog = async (formData, token) => {
  console.log(token, formData);
    const res = await axios.post(API, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

// Get approved blogs
export const fetchApprovedBlogs = async () => {
    const res = await axios.get(API);
    return res.data;
};

// Get all blogs (admin)
export const fetchAllBlogs = async (token) => {
    const res = await axios.get(`${API}/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Approve blog (admin)
export const approveBlog = async (id, token) => {
    const res = await axios.put(`${API}/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Update blog
export const updateBlog = async (id, formData, token) => {
    const res = await axios.put(`${API}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

// Delete blog
export const deleteBlog = async (id, token) => {
    const res = await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}`, }
    });
    return res.data;
};

// ✅ New toggle API
export const toggleBlogApproval = async (id, token) => {
  const { data } = await axios.patch(
    `${API}/${id}/toggle-approval`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};


// Fetch blogs by team member
export const fetchBlogsByTeamMember = async (teamMemberId, token) => {
  try {
    console.log(teamMemberId,token);
    const { data } = await axios.get(`${API}/team/${teamMemberId}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch blogs" };
  }
};

export const fetchSingleBlog = async (slug) => {
  const { data } = await axios.get(`${API}/${slug}`);
  return data;
};

// slug to data
export const fetchBlogBySlug = async (slug) => {
  const { data } = await axios.get(`${API}/${slug}`);
  return data;
};