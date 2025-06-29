import express from "express";
import {
  fetchAllAppointments,
  fetchAppointmentById,
  addAppointment,
  editAppointment,
  removeAppointment,
  fetchAppointmentsByPatientId,
} from "../controllers/Appointment.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["doctor", "assistant", "admin"]),
  fetchAllAppointments
);
router.get(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant", "admin"]),
  fetchAppointmentById
);
router.post(
  "/",
  authenticate,
  authorize(["doctor", "assistant", "admin"]),
  addAppointment
);
router.put(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant", "admin"]),
  editAppointment
);
router.delete(
  "/:id",
  authenticate,
  authorize(["doctor", "admin"]),
  removeAppointment
);
router.get(
  "/patient/:patient_id",
  authenticate,
  authorize(["doctor", "assistant", "admin"]),
  fetchAppointmentsByPatientId
);

export default router;
