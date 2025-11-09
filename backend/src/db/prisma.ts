import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ MySQL connected via Prisma");
  } catch (err) {
    console.error("❌ MySQL connection failed", err);
  }
})();
