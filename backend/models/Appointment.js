import db from "../db/db.js";

export const getAllAppointments = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT appointments.*, patients.name AS patient_name
       FROM appointments
       JOIN patients ON appointments.patient_id = patients.id`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export const getAppointmentById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT appointments.*, patients.name AS patient_name
             FROM appointments
             JOIN patients ON appointments.patient_id = patients.id
             WHERE appointments.id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

export const createAppointment = ({
  patient_id,
  date,
  time,
  reason,
  notes,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO appointments (patient_id, date, time, reason, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [patient_id, date, time, reason, notes],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id: this.lastID,
            patient_id,
            date,
            time,
            reason,
            notes,
          });
      }
    );
  });
};
export const deleteAppointment = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM appointments WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes > 0 });
    });
  });
};
