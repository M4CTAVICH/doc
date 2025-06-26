import db from "./db.js";

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS visit_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      appointment_id INTEGER,
      date TEXT NOT NULL,
      note TEXT NOT NULL,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(appointment_id) REFERENCES appointments(id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating visit_notes table:", err.message);
      } else {
        console.log("Visit notes table created or already exists.");
      }
      db.close();
    }
  );
});
