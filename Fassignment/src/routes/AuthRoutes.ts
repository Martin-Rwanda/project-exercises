import { Router } from "express";
import { authController } from "../controller";

const authRoutes: Router = Router();

authRoutes.post('/auth/login', authController.login);
authRoutes.post('/auth/logout', authController.logout);


export {authRoutes}