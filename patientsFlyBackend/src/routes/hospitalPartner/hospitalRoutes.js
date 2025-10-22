import { Router } from "express";
import upload  from "../../middleware/multer.js";
import {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} from "../../controller/hospitalPartner/hospitalController.js";

const router = Router();

// List + Create (multipart for image)
router.get("/", getHospitals);
router.post("/", upload.single("image"), createHospital);

// Read one + Update + Delete
router.get("/:id", getHospitalById);
router.put("/:id", upload.single("image"), updateHospital);
router.delete("/:id", deleteHospital);

export default router;
