<<<<<<< HEAD
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    lessonsCompleted: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [String],
      default: [],
    },
    lastSyncAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Progress ||
  mongoose.model("Progress", progressSchema);
=======
import { Router } from "express";
import { db } from "../config/firebaseAdmin.js";

const router = Router();

router.post("/sync", async (req, res) => {
  const { userId, lessonsCompleted, badges } = req.body;

  await db.collection("progress").doc(userId).set(
    {
      lessonsCompleted,
      badges,
      lastSyncAt: new Date(),
    },
    { merge: true }
  );

  res.json({ success: true });
});

export default router;
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
