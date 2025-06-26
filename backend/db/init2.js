import db from "./db.js";

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      reason TEXT,
      notes TEXT,
      FOREIGN KEY(patient_id) REFERENCES patients(id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating appointments table:", err.message);
      } else {
        console.log("Appointments table created or already exists.");
      }
      db.close();
    }
  );
});
