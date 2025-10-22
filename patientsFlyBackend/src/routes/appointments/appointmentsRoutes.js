import express from "express";
import { createAppointment, getAppointments, deleteAppointment } from "../../controller/appointment/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.delete("/:id", deleteAppointment); 

export default router;
