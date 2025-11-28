// src/db/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      unique: true,
      sparse: true,
      required: true, // register me email required hi rakha hai
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: { type: String, required: true },

    userType: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },

    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },

    student: {
      className: { type: String },
      rollNo: { type: String },
      stream: { type: String },
      batchYear: { type: String },
    },

    faculty: {
      department: { type: String },
      employeeId: { type: String, unique: true, sparse: true },
      designation: { type: String },
      experience: { type: String },
    },

    admin: {
      adminCode: { type: String },
      roleLevel: { type: String, default: "super" },
    },

    verifyToken: { type: String },
    verifyTokenExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
