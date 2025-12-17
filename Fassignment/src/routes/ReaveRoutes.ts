import { Router} from "express";
import { leaveController } from "../controller";
import { authenticate, authorize } from "../middleware/AuthMiddleware";

const LeaveRouter: Router = Router();


LeaveRouter.post("/leave", authenticate, leaveController.requestLeave);
LeaveRouter.get("/leave", authenticate, leaveController.getLeaveRequests);
LeaveRouter.patch(
  "/leave",
  authenticate,
  authorize("admin"),
  leaveController.approveOrRejectLeave
);