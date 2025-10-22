import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/auth";

export const fetchUsers = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUser = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const toggleBlockUser = async (id, token) => {
  const res = await axios.patch(`${API_URL}/${id}/block`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const toggleCanPost = async (id, token) => {
  const res = await axios.patch(`${API_URL}/${id}/can-post`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update profile
export const updateProfile = async (token, profileData) => {
  const { data } = await axios.put(`${API_URL}/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};


// Toggle user role
export const toggleUserRole = async (userId, token) => {
  const { data } = await axios.put(`${API_URL}/role/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
