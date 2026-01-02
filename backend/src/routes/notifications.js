<<<<<<< HEAD
// backend/src/routes/notifications.js
import express from "express";
import Notification from "../db/Notification.js";

const router = express.Router();

// ➕ ADD notification (faculty)
router.post("/add", async (req, res) => {
  try {
    const { title, message, createdBy, roleAllowed } = req.body;

    if (!title || !message) {
      return res
        .status(400)
        .json({ success: false, error: "Title and message required" });
    }

    const note = await Notification.create({
      title,
      message,
      createdBy,
      roleAllowed: roleAllowed || "student",
    });

    return res.json({ success: true, note });
  } catch (err) {
    console.error("NOTIFICATION ADD ERROR =>", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create notification" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const now = new Date();
    const notes = await Notification.find({
      $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gt: now } }],
    }).sort({ createdAt: -1 });

    return res.json({ success: true, notes });
  } catch (err) {
    console.error("NOTIFICATION LIST ERROR =>", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch notifications" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Notification not found" });
    }

    return res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error("NOTIFICATION DELETE ERROR =>", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete notification" });
  }
});
export default router;
=======
import express from "express";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, message, createdBy, roleAllowed } = req.body;

  if (!title || !message)
    return res.status(400).json({ success: false });

  const ref = await db.collection("notifications").add({
    title,
    message,
    createdBy,
    roleAllowed: roleAllowed || "student",
    createdAt: new Date(),
  });

  res.json({ success: true, id: ref.id });
});

router.get("/list", async (_, res) => {
  const snap = await db
    .collection("notifications")
    .orderBy("createdAt", "desc")
    .get();

  res.json({
    success: true,
    notes: snap.docs.map(d => ({ id: d.id, ...d.data() })),
  });
});

router.delete("/:id", async (req, res) => {
  await db.collection("notifications").doc(req.params.id).delete();
  res.json({ success: true });
});

export default router;
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
