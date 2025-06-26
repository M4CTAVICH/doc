import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../models/Appointment.js";

export const fetchAllAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAppointment = async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const editAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateAppointment({ id, ...req.body });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAppointment(id);
    if (result.deleted) res.json({ success: true });
    else res.status(404).json({ error: "Appointment not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
