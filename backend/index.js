import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import patientRoutes from "./routes/Patient.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/patients", patientRoutes);
app.get("/", (req, res) => {
  res.send("Backend API is running");
});
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
