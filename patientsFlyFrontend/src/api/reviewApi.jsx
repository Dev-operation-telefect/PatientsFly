import axios from "axios";
const BASE = import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/reviews";

export const getReviews = () => axios.get(`${BASE}/`);
export const getReviewById = (id) => axios.get(`${BASE}/${id}`);

export const createReview = (formData) =>
  axios.post(`${BASE}/`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const updateReview = (id, formData) =>
  axios.put(`${BASE}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteReview = (id) => axios.delete(`${BASE}/${id}`);
export const deleteAllReviews = () => axios.delete(`${BASE}/`);
