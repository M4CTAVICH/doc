import db from "./db.js";

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT
    )
  `,
    (err) => {
      if (err) console.error("Table creation error:", err);
      else console.log("Patients table ready.");
      db.close();
    }
  );
});
