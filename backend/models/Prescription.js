import db from "../db/db.js";
export const getAllPrescriptions = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT prescriptions. *  , patients.name AS patient_name FROM prescriptions
         JOIN patients ON prescriptions.patient_id = patients.id`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export const getPrescriptionById = (id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT prescriptions. *  , patients.name AS patient_name FROM prescriptions
             JOIN patients ON prescriptions.patient_id = patients.id
             WHERE prescriptions.id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

export const createPrescription = ({
  patient_id,
  appointment_id,
  date,
  medication,
  dosage,
  instructions,
  notes,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO prescriptions (patient_id, appointment_id, date, medication, dosage, instructions, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        patient_id,
        appointment_id,
        date,
        medication,
        dosage,
        instructions,
        notes,
      ],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id: this.lastID,
            patient_id,
            appointment_id,
            date,
            medication,
            dosage,
            instructions,
            notes,
          });
      }
    );
  });
};
export const updatePrescription = ({
  id,
  patient_id,
  appointment_id,
  date,
  medication,
  dosage,
  instructions,
  notes,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE prescriptions
         SET patient_id = ?, appointment_id = ?, date = ?, medication = ?, dosage = ?, instructions = ?, notes = ?
         WHERE id = ?`,
      [
        patient_id,
        appointment_id,
        date,
        medication,
        dosage,
        instructions,
        notes,
        id,
      ],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id,
            patient_id,
            appointment_id,
            date,
            medication,
            dosage,
            instructions,
            notes,
          });
      }
    );
  });
};
export const deletePrescription = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM prescriptions WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes > 0 });
    });
  });
};
export const getPrescriptionsByPatientId = (patient_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM prescriptions WHERE patient_id = ?`,
      [patient_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};
