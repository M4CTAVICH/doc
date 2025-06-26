import express from "express";
import {
  fetchAllAppointments,
  fetchAppointmentById,
  addAppointment,
  editAppointment,
  removeAppointment,
  fetchAppointmentsByPatientId,
} from "../controllers/Appointment.js";

const router = express.Router();

router.get("/", fetchAllAppointments);
router.get("/:id", fetchAppointmentById);
router.post("/", addAppointment);
router.put("/:id", editAppointment);
router.delete("/:id", removeAppointment);
router.get("/patient/:patient_id", fetchAppointmentsByPatientId);

export default router;
