import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";

import authRoutes from "./routes/authRegis.js"; 
import publicRoutes from "./routes/public.js";
import progressRoutes from "./routes/progress.js";
import healthRoutes from "./routes/health.js";

import { notFound, errorHandler } from "./middleware/error.js";
import { connectMongo } from "./db/mongo.js";   

const app = express();

// ---------- Connect MongoDB ----------
connectMongo();

// ---------- Global Middlewares ----------
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// ---------- Rate Limit ----------
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  })
);

// ---------- Routes ----------
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);          // ⬅ yaha bhi naya authRegis use ho raha hai
app.use("/api/public", publicRoutes);
app.use("/api/progress", progressRoutes);

// ---------- Error Handling ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Server ----------
const server = app.listen(env.PORT, () => {
  console.log(`✅ Server running at http://localhost:${env.PORT}`);
});

// ---------- Graceful Shutdown ----------
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => process.exit(0));
});
