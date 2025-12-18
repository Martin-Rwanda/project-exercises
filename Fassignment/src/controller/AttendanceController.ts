import { Response } from "express";
import { attendanceService } from "../service";
import { AuthRequest } from "../middleware/AuthMiddleware";

export class AttendanceController {
  async recordAttendance(req: AuthRequest, res: Response) {
    try {
      const { userId, status } = req.body;

      const attendance = await attendanceService.recordAttendance(userId, status);

      return res.status(201).json({
        success: true,
        message: "Attendance recorded",
        data: attendance,
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getAttendance(req: AuthRequest, res: Response) {
    try {
      const user = req.user;

      let data;
      if (user?.role === "admin") {
        data = await attendanceService.getAllAttendance();
      } else {
        data = await attendanceService.getAttendanceForUser(user!.sub as any);
      }

      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const attendanceController = new AttendanceController