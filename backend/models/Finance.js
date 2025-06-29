import db from "../db/db.js";

export const getAllFinance = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT finance.*, patients.name AS patient_name
       FROM finance
       JOIN patients ON finance.patient_id = patients.id`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export const getFinanceById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT finance.*, patients.name AS patient_name
       FROM finance
       JOIN patients ON finance.patient_id = patients.id
       WHERE finance.id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

export const createFinance = ({
  patient_id,
  appointment_id,
  amount,
  date,
  method,
  note,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO finance (patient_id, appointment_id, amount, date, method, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patient_id, appointment_id, amount, date, method, note],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id: this.lastID,
            patient_id,
            appointment_id,
            amount,
            date,
            method,
            note,
          });
      }
    );
  });
};

export const updateFinance = ({
  id,
  patient_id,
  appointment_id,
  amount,
  date,
  method,
  note,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE finance
       SET patient_id = ?, appointment_id = ?, amount = ?, date = ?, method = ?, note = ?
       WHERE id = ?`,
      [patient_id, appointment_id, amount, date, method, note, id],
      function (err) {
        if (err) reject(err);
        else
          resolve({
            id,
            patient_id,
            appointment_id,
            amount,
            date,
            method,
            note,
          });
      }
    );
  });
};

export const deleteFinance = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM finance WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes > 0 });
    });
  });
};
