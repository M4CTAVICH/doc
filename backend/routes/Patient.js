import express from "express";
import {
  fetchAllPatients,
  addPatient,
  editPatient,
  removePatient,
  fetchPatientById,
} from "../controllers/Patient.js";

const router = express.Router();
router.get("/", fetchAllPatients);
router.post("/", addPatient);
router.put("/:id", editPatient);
router.delete("/:id", removePatient);
router.get("/:id", fetchPatientById);
export default router;
