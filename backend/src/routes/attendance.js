import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Attendance from "../db/Attendance.js";

const router = Router();
let liveAttendance = null;

/* Generate code */
function generateCode(length = 4) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function getClientIP(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0] ||
         req.socket.remoteAddress;
}

/* ================= TEACHER ================= */
router.post("/start", auth, (req, res) => {
  liveAttendance = {
    code: generateCode(),
    expiresAt: Date.now() + (req.body.durationSeconds || 60) * 1000,
  };

  res.json(liveAttendance);
});

/* ================= STUDENT ================= */
router.post("/mark", auth, async (req, res) => {
  if (!liveAttendance)
    return res.status(400).json({ message: "Attendance not started" });

  if (Date.now() > liveAttendance.expiresAt) {
    liveAttendance = null;
    return res.status(400).json({ message: "Code expired" });
  }

  if (req.body.code !== liveAttendance.code)
    return res.status(400).json({ message: "Invalid code" });

  const today = new Date().toISOString().split("T")[0];

  // ✅ FIXED user reference
  const studentId = req.user.id || "DEV_STUDENT_ID";
  const studentName = req.user.name || "Demo Student";

  const alreadyMarked = await Attendance.findOne({
    studentId,
    date: today,
  });

  if (alreadyMarked) {
    return res.status(409).json({ message: "Attendance already marked" });
  }

  await Attendance.create({
    studentId,
    studentName,
    attendanceCode: liveAttendance.code, // ✅ plain text
    ip: getClientIP(req),
    date: today,
  });

  res.json({ message: "✅ Attendance marked successfully" });
});

export default router;
