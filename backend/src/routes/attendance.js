import { Router } from "express";
import { auth } from "../middleware/auth.js";
<<<<<<< HEAD
import Attendance from "../db/Attendance.js";
=======
import { db } from "../config/firebaseAdmin.js";
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84

const router = Router();
let liveAttendance = null;

<<<<<<< HEAD
/* Generate code */
=======
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
function generateCode(length = 4) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

<<<<<<< HEAD
function getClientIP(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0] ||
         req.socket.remoteAddress;
}

/* ================= TEACHER ================= */
=======
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
router.post("/start", auth, (req, res) => {
  liveAttendance = {
    code: generateCode(),
    expiresAt: Date.now() + (req.body.durationSeconds || 60) * 1000,
  };
<<<<<<< HEAD

  res.json(liveAttendance);
});

/* ================= STUDENT ================= */
=======
  res.json(liveAttendance);
});

>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
router.post("/mark", auth, async (req, res) => {
  if (!liveAttendance)
    return res.status(400).json({ message: "Attendance not started" });

  if (Date.now() > liveAttendance.expiresAt) {
    liveAttendance = null;
    return res.status(400).json({ message: "Code expired" });
  }

  if (req.body.code !== liveAttendance.code)
    return res.status(400).json({ message: "Invalid code" });

<<<<<<< HEAD
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
=======
  const date = new Date().toISOString().split("T")[0];
  const studentId = req.user.id;

  const ref = db.collection("attendance").doc(`${studentId}_${date}`);
  if ((await ref.get()).exists)
    return res.status(409).json({ message: "Attendance already marked" });

  await ref.set({
    studentId,
    studentName: req.user.name,
    date,
    code: liveAttendance.code,
    createdAt: new Date(),
  });

  res.json({ message: "Attendance marked successfully" });
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
});

export default router;
