import db from "../db/db.js";

export const getAllVisitNotes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT visit_notes.*, patients.name AS patient_name
       FROM visit_notes
       JOIN patients ON visit_notes.patient_id = patients.id`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export const getVisitNoteById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT visit_notes.*, patients.name AS patient_name
       FROM visit_notes
       JOIN patients ON visit_notes.patient_id = patients.id
       WHERE visit_notes.id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

export const createVisitNote = ({ patient_id, appointment_id, date, note }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO visit_notes (patient_id, appointment_id, date, note)
       VALUES (?, ?, ?, ?)`,
      [patient_id, appointment_id, date, note],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id: this.lastID,
            patient_id,
            appointment_id,
            date,
            note,
          });
      }
    );
  });
};

export const updateVisitNote = ({
  id,
  patient_id,
  appointment_id,
  date,
  note,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE visit_notes
       SET patient_id = ?, appointment_id = ?, date = ?, note = ?
       WHERE id = ?`,
      [patient_id, appointment_id, date, note, id],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id,
            patient_id,
            appointment_id,
            date,
            note,
          });
      }
    );
  });
};

export const deleteVisitNote = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM visit_notes WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes > 0 });
    });
  });
};
export const getVisitNotesByPatientId = (patient_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM visit_notes WHERE patient_id = ?`,
      [patient_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};
