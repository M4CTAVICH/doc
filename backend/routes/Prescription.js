import express from "express";
import {
  fetchAllPrescriptions,
  fetchPrescriptionById,
  addPrescription,
  editPrescription,
  removePrescription,
  fetchPrescriptionsByPatientId,
} from "../controllers/Prescription.js";

const router = express.Router();

router.get("/", fetchAllPrescriptions);
router.get("/:id", fetchPrescriptionById);
router.post("/", addPrescription);
router.put("/:id", editPrescription);
router.delete("/:id", removePrescription);
router.get("/patient/:patient_id", fetchPrescriptionsByPatientId);

export default router;
