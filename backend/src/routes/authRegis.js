import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../db/User.js";        
import { env } from "../config/env.js";


const router = express.Router();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

// nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// allowed roles
const ALLOWED_USER_TYPES = ["student", "faculty", "admin"];

/**
 * REGISTER USER
 * body example:
 * {
 *   name, email, password, userType: "student",
 *   student: { className, rollNo, stream, batchYear }
 * }
 */
router.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    const { email, phone, userType } = payload;

    // 1) basic checks
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: "Provide email or phone",
      });
    }

    // 2) role check
    if (!userType || !ALLOWED_USER_TYPES.includes(userType)) {
      return res.status(400).json({
        success: false,
        error: "Invalid userType. Allowed: student, faculty, admin",
      });
    }

    // (optional) role-wise required fields
    if (userType === "student" && !payload.student) {
      return res
        .status(400)
        .json({ success: false, error: "Student data required" });
    }
    if (userType === "faculty" && !payload.faculty) {
      return res
        .status(400)
        .json({ success: false, error: "Faculty data required" });
    }
    if (userType === "admin" && !payload.admin) {
      return res
        .status(400)
        .json({ success: false, error: "Admin data required" });
    }

    // 3) email unique check
    if (email) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          error: "Email already registered",
        });
      }
    }

    // 4) create user (isVerified = false by default from schema)
    const user = new User(payload);

    // 5) generate verify token
    const token = crypto.randomBytes(32).toString("hex");
    user.verifyToken = token;
    user.verifyTokenExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    await user.save();

    const verifyLink = `${BACKEND_URL}/api/auth/verify-email?token=${token}&userId=${user._id}`;

    // 6) send email
    if (user.email) {
      await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Verify your email",
        html: `
          <h3>Hi ${user.name || ""},</h3>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verifyLink}">${verifyLink}</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });
    }

    return res.json({
      success: true,
      message: "User registered. Verification link sent to email.",
      verifyLink, // optional: remove in production if you don't want to expose
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// VERIFY EMAIL (clicked from link)
router.get("/verify-email", async (req, res) => {
  try {
    const { token, userId } = req.query;

    if (!token || !userId) {
      return res.status(400).json({
        success: false,
        error: "Token and userId required",
      });
    }

    const user = await User.findOne({
      _id: userId,
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() }, // not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    // either redirect to frontend OR send JSON – not both
    return res.redirect("http://localhost:5173/verified-success-page");
    // If you want JSON instead, comment redirect above and use this:
    /*
    return res.json({
      success: true,
      message: "Email verified successfully",
      user,
    });
    */
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// LOGIN (simple version without JWT yet)
router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password required" });
    }

    const query = { email, password }; // TODO: replace with hashed password check
    if (userType && ALLOWED_USER_TYPES.includes(userType)) {
      query.userType = userType;
    }

    const user = await User.findOne(query);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Please verify your email before login",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// FIND USER BY EMAIL OR PHONE (for OTP login)
router.post("/find", async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res
        .status(400)
        .json({ success: false, error: "identifier required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.json({
        success: false,
        user: null,
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
