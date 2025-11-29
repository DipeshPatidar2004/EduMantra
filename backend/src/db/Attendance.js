import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String },
  attendanceCode: { type: String },
  ip: { type: String },
  date: { type: String, required: true },
  markedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Attendance", attendanceSchema);
