import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientById,
} from "../models/Patient.js";

export const fetchAllPatients = async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    const patient = await createPatient(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updatePatient({ id, ...req.body });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePatient(id);
    if (result.deleted) res.json({ sucess: true });
    else res.status(404).json({ error: "Patient not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await getPatientById(id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
