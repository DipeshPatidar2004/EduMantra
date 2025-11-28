// src/index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import authRoutesForRegis from "./routes/authRegis.js";
import publicRoutes from "./routes/public.js";
import progressRoutes from "./routes/progress.js";
import healthRoutes from "./routes/health.js";

import { notFound, errorHandler } from "./middleware/error.js";
import { connectMongo } from "./db/mongo.js";

const app = express();

// ---------- Global Middlewares ----------
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// ---------- Rate Limit ----------
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  })
);

// ---------- Connect MongoDB ----------
connectMongo();

// ---------- Routes ----------
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutesForRegis);
app.use("/api/public", publicRoutes);
app.use("/api/progress", progressRoutes);

// ---------- Error Handling ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Server ----------
const server = app.listen(env.PORT, () => {
  console.log(`✅ Server running at http://localhost:${env.PORT}`);
});

process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => process.exit(0));
});
