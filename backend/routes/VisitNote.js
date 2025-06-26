import express from "express";
import {
  fetchAllVisitNotes,
  fetchVisitNoteById,
  addVisitNote,
  editVisitNote,
  removeVisitNote,
  fetchVisitNotesByPatientId,
} from "../controllers/VisitNote.js";

const router = express.Router();

router.get("/", fetchAllVisitNotes);
router.get("/:id", fetchVisitNoteById);
router.post("/", addVisitNote);
router.put("/:id", editVisitNote);
router.delete("/:id", removeVisitNote);
router.get("/patient/:patient_id", fetchVisitNotesByPatientId);

export default router;
