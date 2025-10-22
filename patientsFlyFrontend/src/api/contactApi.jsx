import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/contact";

export const getContacts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createContact = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
// POST new contact message
export const postContactMessage = async (formData) => {
  const res = await axios.post(BASE_URL, formData);
  return res.data;
}