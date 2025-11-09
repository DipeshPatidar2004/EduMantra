import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env";

import authRoutes from "./routes/auth";
import publicRoutes from "./routes/public";
import progressRoutes from "./routes/progress";
import healthRoutes from "./routes/health";

import { notFound, errorHandler } from "./middleware/error";
import { prisma } from "./db/prisma";


const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(rateLimit({ windowMs: 60000, max: 120 }));

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/progress", progressRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(env.PORT, () =>
  console.log(`✅ Server running at http://localhost:${env.PORT}`)
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close();
});
