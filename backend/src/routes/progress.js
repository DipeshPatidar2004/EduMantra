import { Router } from "express";
import { z } from "zod";
import { auth } from "../middleware/auth.js";
import prisma from "../db/prisma.js";

const router = Router();

// ---------- Get my progress ----------
router.get("/me", auth, async (req, res) => {
  const userId = req.user.id;

  let progress = await prisma.progress.findUnique({
    where: { userId },
  });

  if (!progress) {
    progress = await prisma.progress.create({
      data: {
        userId,
        lessonsCompleted: 0,
        badges: [],
        lastSyncAt: new Date(),
      },
    });
  }

  res.json(progress);
});

// ---------- Sync progress ----------
const syncSchema = z.object({
  lessonsCompleted: z.number().min(0),
  badges: z.array(z.string()).optional().default([]),
});

router.post("/sync", auth, async (req, res) => {
  const parsed = syncSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  const userId = req.user.id;
  const { lessonsCompleted, badges } = parsed.data;

  const current = await prisma.progress.findUnique({
    where: { userId },
  });

  // If no progress yet
  if (!current) {
    const newProgress = await prisma.progress.create({
      data: {
        userId,
        lessonsCompleted,
        badges,
        lastSyncAt: new Date(),
      },
    });

    return res.json({ message: "Synced", progress: newProgress });
  }

  // Merge badges (unique)
  const mergedBadges = Array.from(
    new Set([...(current.badges || []), ...badges])
  );

  const updated = await prisma.progress.update({
    where: { userId },
    data: {
      lessonsCompleted: current.lessonsCompleted + lessonsCompleted,
      badges: mergedBadges,
      lastSyncAt: new Date(),
    },
  });

  res.json({ message: "Synced", progress: updated });
});

export default router;
