import db from "./db.js";

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS finance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      appointment_id INTEGER,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      method TEXT,
      note TEXT,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(appointment_id) REFERENCES appointments(id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating finance table:", err.message);
      } else {
        console.log("Finance table created or already exists.");
      }
      db.close();
    }
  );
});
