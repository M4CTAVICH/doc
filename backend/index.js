import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import patientRoutes from "./routes/Patient.js";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/Appointment.js";
import prescriptionRoutes from "./routes/Prescription.js";
import visitNoteRoutes from "./routes/VisitNote.js";
import financeRoutes from "./routes/Finance.js";
import authRoutes from "./routes/Auth.js";
import messageRoutes from "./routes/Message.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/visit-notes", visitNoteRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
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
