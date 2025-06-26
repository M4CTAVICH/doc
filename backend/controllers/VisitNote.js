import {
  getAllVisitNotes,
  getVisitNoteById,
  createVisitNote,
  updateVisitNote,
  deleteVisitNote,
  getVisitNotesByPatientId,
} from "../models/VisitNote.js";

export const fetchAllVisitNotes = async (req, res) => {
  try {
    const notes = await getAllVisitNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchVisitNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await getVisitNoteById(id);
    if (note) res.json(note);
    else res.status(404).json({ error: "Visit note not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addVisitNote = async (req, res) => {
  try {
    const note = await createVisitNote(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editVisitNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateVisitNote({ id, ...req.body });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeVisitNote = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteVisitNote(id);
    if (result.deleted) res.json({ success: true });
    else res.status(404).json({ error: "Visit note not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const fetchVisitNotesByPatientId = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const notes = await getVisitNotesByPatientId(patient_id);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
