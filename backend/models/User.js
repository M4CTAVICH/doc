import db from "../db/db.js";

export const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createUser = ({ username, password_hash, role, name }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username , password_hash , role , name) VALUES (?, ?, ?, ?)",
      [username, password_hash, role, name],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, username, role, name });
      }
    );
  });
};
