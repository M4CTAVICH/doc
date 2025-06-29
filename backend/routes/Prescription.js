import express from "express";
import {
  fetchAllPrescriptions,
  fetchPrescriptionById,
  addPrescription,
  editPrescription,
  removePrescription,
  fetchPrescriptionsByPatientId,
} from "../controllers/Prescription.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchAllPrescriptions
);
router.get(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchPrescriptionById
);
router.post("/", authenticate, authorize(["doctor"]), addPrescription);
router.put("/:id", authenticate, authorize(["doctor"]), editPrescription);
router.delete("/:id", authenticate, authorize(["doctor"]), removePrescription);
router.get(
  "/patient/:patient_id",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchPrescriptionsByPatientId
);

export default router;
