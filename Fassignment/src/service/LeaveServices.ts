import { LeaveModel } from "../model";
import { Types } from "mongoose";

export class LeaveService {
  async requestLeave(userId: string, reason: string) {
    return LeaveModel.create({
      userId: new Types.ObjectId(userId),
      reason,
    });
  }

  async getLeaveRequestsForUser(userId: string) {
    return LeaveModel.find({
      userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
  }

  async getAllLeaveRequests() {
    return LeaveModel.find().sort({ createdAt: -1 });
  }

  async updateLeaveStatus(
    leaveId: string,
    status: "PENDING" | "APPROVED" | "REJECTED"
  ) {
    return LeaveModel.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );
  }
}

export const leaveService = new LeaveService();