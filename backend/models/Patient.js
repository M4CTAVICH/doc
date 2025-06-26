import db from "../db/db.js";

export const getAllPatients = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const createPatient = ({ name, age, gender }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO patients (name , age ,gender) VALUES(? , ? , ?)",
      [name, age, gender],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, age, gender });
      }
    );
  });
};

export const updatePatient = ({ id, name, age, gender }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE patients SET name = ? , age = ? , gender = ? WHERE id = ?",
      [name, age, gender, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, name, age, gender });
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
