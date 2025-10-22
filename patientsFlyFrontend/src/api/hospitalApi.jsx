import axios from "axios";

const API = import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/hospitals";

export const getHospitals = () => axios.get(`${API}/`);
export const getHospitalById = (id) => axios.get(`${API}/${id}`);
export const createHospital = (formData) =>
  axios.post(`${API}/`, formData, { headers: { "Content-Type": "multipart/form-data" }});
export const updateHospital = (id, formData) =>
  axios.put(`${API}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" }});
export const deleteHospital = (id) => axios.delete(`${API}/${id}`);
