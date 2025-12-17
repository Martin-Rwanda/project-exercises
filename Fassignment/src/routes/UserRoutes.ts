import { Router } from "express";
import { userController } from "../controller/UserController";

const userRoutes: Router = Router();

userRoutes.post('/users', userController.registerUser);


export {userRoutes}