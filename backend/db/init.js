import db from "./db.js";

db.run(`ALTER TABLE patients ADD COLUMN phone TEXT`, (err) => {
  if (err) {
    if (err.message.includes("duplicate column name")) {
      console.log("Column 'phone' already exists.");
    } else {
      console.error("Error adding phone column:", err.message);
    }
  } else {
    console.log("Column 'phone' added to patients table.");
  }
  db.close();
});
