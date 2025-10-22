// src/api/companyApi.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/air-ambulance/v1/companies",
});

// Get all companies
export const getCompanies = () => API.get("/");

// Get single company
export const getCompanyById = (id) => API.get(`/${id}`);

// Create company
export const createCompany = (data) => API.post("/", data);

// Update company
export const updateCompany = (id, data) => API.put(`/${id}`, data);

// Delete company
export const deleteCompany = (id) => API.delete(`/${id}`);
