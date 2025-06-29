import {
  getAllFinance,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
} from "../models/Finance.js";

export const fetchAllFinance = async (req, res) => {
  try {
    const finance = await getAllFinance();
    res.json(finance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchFinanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await getFinanceById(id);
    if (record) res.json(record);
    else res.status(404).json({ error: "Finance record not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await createFinance(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateFinance({ id, ...req.body });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteFinance(id);
    if (result.delete) res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
