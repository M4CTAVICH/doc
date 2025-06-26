import {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
} from "../models/Prescription.js";

export const fetchAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await getAllPrescriptions();
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await getPrescriptionById(id);
    if (prescription) res.json(prescription);
    else res.status(404).json({ error: "Prescription not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addPrescription = async (req, res) => {
  try {
    const prescription = await createPrescription(req.body);
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const editPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updatePrescription({ id, ...req.body });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const removePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePrescription(id);
    if (result.deleted) res.json({ success: true });
    else res.status(404).json({ error: "Prescription not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
