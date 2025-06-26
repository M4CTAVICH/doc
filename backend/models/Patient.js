import db from "../db/db.js";

export const getAllPatients = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const createPatient = ({ name, age, gender, phone }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO patients (name, age, gender, phone) VALUES (?, ?, ?, ?)",
      [name, age, gender, phone],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, age, gender, phone });
      }
    );
  });
};

export const updatePatient = ({ id, name, age, gender, phone }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE patients SET name = ?, age = ?, gender = ?, phone = ? WHERE id = ?",
      [name, age, gender, phone, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, name, age, gender, phone });
      }
    );
  });
};

export const deletePatient = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM patients WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve({ message: "Patient deleted successfully", id });
    });
  });
};

export const getPatientById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM patients WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};
