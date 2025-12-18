import { Router} from "express";
import { leaveController } from "../controller";
import { authenticate, roleMiddleware } from "../middleware";

const LeaveRouter: Router = Router();


/**
 * @openapi
 * /leave:
 *   post:
 *     tags:
 *       - Leave
 *     summary: Student requests leave
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Medical appointment
 *     responses:
 *       201:
 *         description: Leave request submitted
 *       401:
 *         description: Unauthorized
 */
LeaveRouter.post("/leave", authenticate, leaveController.requestLeave);

/**
 * @openapi
 * /leave:
 *   get:
 *     tags:
 *       - Leave
 *     summary: Admin views all leave requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all leave requests
 *       401:
 *         description: Unauthorized
 */
LeaveRouter.get("/leave", authenticate, leaveController.getLeaveRequests);

/**
 * @openapi
 * /leave:
 *   patch:
 *     tags:
 *       - Leave
 *     summary: Admin approves or rejects leave request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveId
 *               - status
 *             properties:
 *               leaveId:
 *                 type: string
 *                 example: 69440621195bc8f85941eca8
 *               status:
 *                 type: string
 *                 enum: [APPROVED, REJECTED]
 *                 example: APPROVED
 *     responses:
 *       200:
 *         description: Leave updated
 *       404:
 *         description: Leave not found
 */
LeaveRouter.patch(
  "/leave",
  authenticate,
  roleMiddleware("admin"),
  leaveController.approveOrRejectLeave
);

export {LeaveRouter}