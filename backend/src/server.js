import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
<<<<<<< HEAD

import { env } from "./config/env.js";
import { connectMongo } from "./db/mongo.js";

/* -------- ROUTES -------- */
import authRoutes from "./routes/authRegis.js";
import publicRoutes from "./routes/public.js";
import progressRoutes from "./routes/progress.js";
import healthRoutes from "./routes/health.js";
import attendanceRoutes from "./routes/attendance.js";
import notificationRoutes from "./routes/notifications.js";
import chatRoutes from "./routes/chat.routes.js";
import classScheduleRoutes from "./routes/classSchedule.js";

/* -------- ERRORS -------- */
import { notFound, errorHandler } from "./middleware/error.js";

/* ✅ CREATE APP FIRST */
const app = express();

/* ✅ CONNECT DATABASE */
connectMongo();

/* ✅ GLOBAL MIDDLEWARES */
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  })
);
app.use("/api/class-schedule", classScheduleRoutes);
/* ✅ ROUTES (ORDER MATTERS) */
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes); // ✅ NOW CORRECT


/* ✅ ERROR HANDLERS (ALWAYS LAST) */
app.use(notFound);
app.use(errorHandler);

/* ✅ START SERVER */
const server = app.listen(env.PORT, () => {
  console.log(`✅ Server running at http://localhost:${env.PORT}`);
});

/* ✅ GRACEFUL SHUTDOWN */
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => process.exit(0));
});
=======
import { env } from "./config/env.js";

import attendanceRoutes from "./routes/attendance.js";
import notificationRoutes from "./routes/notifications.js";
import progressRoutes from "./routes/progress.js";
import healthRoutes from "./routes/health.js";
import publicRoutes from "./routes/public.js";
import chatRoutes from "./routes/chat.routes.js";

import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60000, max: 120 }));

app.use("/api", healthRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/gemini", chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, () =>
  console.log(`✅ Server running on http://localhost:${env.PORT}`)
);
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
