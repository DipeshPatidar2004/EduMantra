import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: { type: String, required: true }, // faculty/admin email
    roleAllowed: { type: String, enum: ["student","faculty","all"], default:"all" }
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);