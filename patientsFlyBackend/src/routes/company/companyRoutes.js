import express from "express";
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from "../../controller/company/companyController.js";

const router = express.Router();

router.post("/", createCompany);     // Add company
router.get("/", getCompanies);       // View all companies
router.get("/:id", getCompanyById);  // View single company
router.put("/:id", updateCompany);   // Edit company
router.delete("/:id", deleteCompany);// Delete company

export default router;
