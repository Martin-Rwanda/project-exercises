import { Response } from "express";
import { leaveService } from "../service";
import { AuthRequest } from "../middleware/AuthMiddleware";

export class LeaveController {
  async requestLeave(req: AuthRequest, res: Response) {
    try {
        const userId = req.user!.sub;
        const { reason } = req.body;

        const leave = await leaveService.requestLeave(userId, reason);

        return res.status(201).json({
        success: true,
        message: "Leave requested",
        data: leave,
        });
    } catch (error: any) {
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    }

  async getLeaveRequests(req: AuthRequest, res: Response) {
    try {
      const user = req.user;

      let data;
      if (user?.role === "admin") {
        data = await leaveService.getAllLeaveRequests();
      } else {
        data = await leaveService.getLeaveRequestsForUser(user!.sub as any);
      }

      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async approveOrRejectLeave(req: AuthRequest, res: Response) {
    try {
      const { leaveId, status } = req.body;

      if (!["APPROVED", "REJECTED"].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }

      const updatedLeave = await leaveService.updateLeaveStatus(leaveId, status as any);

      return res.status(200).json({
        success: true,
        message: `Leave ${status.toLowerCase()}`,
        data: updatedLeave,
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const leaveController = new LeaveController;