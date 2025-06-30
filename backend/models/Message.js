import db from "../db/db.js";

export const sendMessage = ({
  from_user_id,
  to_user_id,
  patient_id,
  content,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (from_user_id, to_user_id, patient_id, content) VALUES (?, ?, ?, ?)`,
      [from_user_id, to_user_id, patient_id, content],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

export const getMessagesForUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT messages.*, u1.name AS from_name, u2.name AS to_name, patients.name AS patient_name
       FROM messages
       JOIN users u1 ON messages.from_user_id = u1.id
       JOIN users u2 ON messages.to_user_id = u2.id
       LEFT JOIN patients ON messages.patient_id = patients.id
       WHERE to_user_id = ?
       ORDER BY timestamp DESC`,
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};
export const getUnreadMessageCount = (user_id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(*) as count FROM messages WHERE to_user_id = ? AND read = 0`,
      [user_id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      }
    );
  });
};
export const markMessageAsRead = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE messages SET read = 1 WHERE id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};
