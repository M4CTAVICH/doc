import db from "./db.js";

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER NOT NULL,
      to_user_id INTEGER NOT NULL,
      patient_id INTEGER,
      content TEXT NOT NULL,
      timestamp TEXT DEFAULT (datetime('now')),
      read INTEGER DEFAULT 0,
      FOREIGN KEY(from_user_id) REFERENCES users(id),
      FOREIGN KEY(to_user_id) REFERENCES users(id),
      FOREIGN KEY(patient_id) REFERENCES patients(id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating messages table:", err.message);
      } else {
        console.log("Messages table created or already exists.");
      }
      db.close();
    }
  );
});
