import express from "express";
import {
  fetchAllAppointments,
  fetchAppointmentById,
  addAppointment,
  editAppointment,
  removeAppointment,
} from "../controllers/Appointment.js";

const router = express.Router();

router.get("/", fetchAllAppointments);
router.get("/:id", fetchAppointmentById);
router.post("/", addAppointment);
router.put("/:id", editAppointment);
router.delete("/:id", removeAppointment);

export default router;
