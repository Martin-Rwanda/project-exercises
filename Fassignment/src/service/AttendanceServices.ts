import { AttendanceModel } from "../model";
import { Types } from "mongoose";

export class AttendanceService {
  async recordAttendance(userId: string, status: "IN" | "OUT") {
    return AttendanceModel.create({
      userId: new Types.ObjectId(userId),
      status,
    });
  }

  async getAttendanceForUser(userId: string) {
    return AttendanceModel.find({
      userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
  }

  async getAllAttendance() {
    return AttendanceModel.find().sort({ createdAt: -1 });
  }
}

export const attendanceService = new AttendanceService();