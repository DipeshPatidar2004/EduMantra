import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log("✅ MongoDB Atlas connected via Prisma");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
})();

export default prisma;
