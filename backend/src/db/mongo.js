import mongoose from "mongoose";
import { env } from "../config/env.js";

export const connectMongo = async () => {
  try {
    if (!env.MONGO_URI) {
      console.error("❌ MONGO_URI is missing. Check your .env file.");
      process.exit(1);
    }

    await mongoose.connect(env.MONGO_URI, {
      dbName: env.MONGO_DB_NAME, // "edumantra"
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
