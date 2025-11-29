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