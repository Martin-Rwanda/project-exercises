import mongoose, { Schema, Types } from "mongoose";

export interface IAttendance {
  userId: Types.ObjectId;
  status: "IN" | "OUT";
  createdAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AttendanceModel = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', attendanceSchema);