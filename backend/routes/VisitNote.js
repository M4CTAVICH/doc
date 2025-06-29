import express from "express";
import {
  fetchAllVisitNotes,
  fetchVisitNoteById,
  addVisitNote,
  editVisitNote,
  removeVisitNote,
  fetchVisitNotesByPatientId,
} from "../controllers/VisitNote.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchAllVisitNotes
);
router.get(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchVisitNoteById
);
router.post("/", authenticate, authorize(["doctor"]), addVisitNote);
router.put("/:id", authenticate, authorize(["doctor"]), editVisitNote);
router.delete("/:id", authenticate, authorize(["doctor"]), removeVisitNote);
router.get(
  "/patient/:patient_id",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchVisitNotesByPatientId
);

export default router;
