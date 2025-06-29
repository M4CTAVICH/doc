import express from "express";
import {
  fetchAllPatients,
  addPatient,
  editPatient,
  removePatient,
  fetchPatientById,
} from "../controllers/Patient.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchAllPatients
);
router.get(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchPatientById
);

router.post("/", authenticate, authorize(["doctor", "assistant"]), addPatient);
router.put(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant"]),
  editPatient
);

router.delete("/:id", authenticate, authorize(["doctor"]), removePatient);

export default router;
