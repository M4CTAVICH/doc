import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatientId,
  searchAppointmentsByPatientName,
  filterAppointmentsByDate,
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

export const fetchAppointmentsByPatientId = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const appointments = await getAppointmentsByPatientId(patient_id);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const searchAppointments = async (req, res) => {
  try {
    const { name } = req.query;
    const results = await searchAppointmentsByPatientName(name);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const filterAppointments = async (req, res) => {
  try {
    const { date } = req.query;
    const results = await filterAppointmentsByDate(date);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
