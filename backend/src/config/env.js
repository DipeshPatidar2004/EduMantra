import dotenv from "dotenv";
<<<<<<< HEAD

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT, 10) || 4000,

  JWT_SECRET: process.env.JWT_SECRET || "changeme",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  // 👇 YAHAN SAB IMPORTANT CHEEZEIN ADD KARO
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "edumantra",

=======
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || "changeme",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
<<<<<<< HEAD

  SEND_SMS: process.env.SEND_SMS === "true",
  OTP_EXPIRY_MIN: parseInt(process.env.OTP_EXPIRY_MIN, 10) || 10,
=======
  
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
};
