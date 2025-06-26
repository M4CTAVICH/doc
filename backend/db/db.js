import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = process.env.DB_FILE || "clinic.sqlite";
const dbPath = path.resolve(__dirname, DB_FILE);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Db connection error:", err);
  else console.log("Connected to the SQLite database");
});

export default db;
