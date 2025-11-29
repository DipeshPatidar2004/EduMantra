import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema(
  {
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    className: {
      type: String, // e.g. "BSc CS - Sem 5"
      required: true,
    },

    subject: {
      type: String, // e.g. "Operating Systems"
      required: true,
    },

    day: {
      type: String, // Monday, Tuesday...
      required: true,
    },

    startTime: {
      type: String, // "10:00"
      required: true,
    },

    endTime: {
      type: String, // "11:00"
      required: true,
    },

    room: {
      type: String, // Lab-2 / Room-301
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClassSchedule", classScheduleSchema);
