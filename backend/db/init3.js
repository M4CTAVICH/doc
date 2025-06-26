import db from "./db.js";

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      appointment_id INTEGER,
      date TEXT NOT NULL,
      medication TEXT NOT NULL,
      dosage TEXT,
      instructions TEXT,
      notes TEXT,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(appointment_id) REFERENCES appointments(id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating prescriptions table:", err.message);
      } else {
        console.log("Prescriptions table created or already exists.");
      }
      db.close();
    }
  );
});
