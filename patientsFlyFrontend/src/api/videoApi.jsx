import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/reviews-videos";

export const getVideos = () => axios.get(API_URL);
export const createVideo = (data) => axios.post(API_URL, data);
export const updateVideo = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteVideo = (id) => axios.delete(`${API_URL}/${id}`);
