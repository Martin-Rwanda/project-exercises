import express from "express";
import { attendanceController } from "../controller";
import { authenticate, authorize } from "../middleware/AuthMiddleware";

const router = express.Router();


router.post(
  "/attendance",
  authenticate,
  authorize("admin"),
  attendanceController.recordAttendance
);

router.get(
  "/attendance",
  authenticate,
  attendanceController.getAttendance
);



export default router;
