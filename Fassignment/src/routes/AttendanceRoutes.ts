import express from "express";
import { attendanceController } from "../controller";
import { authenticate, roleMiddleware } from "../middleware";

const attendRouter = express.Router();

/**
 * @openapi
 * /attendance:
 *   post:
 *     tags:
 *       - Attendance
 *     summary: Record attendance for a student (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6943c970ee2d489ec1044897
 *               status:
 *                 type: string
 *                 enum: [IN, OUT]
 *                 example: IN
 *     responses:
 *       201:
 *         description: Attendance recorded
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
attendRouter.post(
  "/attendance",
  authenticate,
  roleMiddleware("admin"),
  attendanceController.recordAttendance
);


/**
 * @openapi
 * /attendance:
 *   get:
 *     tags:
 *       - Attendance
 *     summary: 
 *       Retrieve attendance. Students get only their attendance. Admin gets all.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records returned successfully.
 *       401:
 *         description: Unauthorized
 */
attendRouter.get(
  "/attendance",
  authenticate,
  roleMiddleware("student"),
  attendanceController.getAttendance
);



export {attendRouter};
