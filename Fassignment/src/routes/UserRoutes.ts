import { Router } from "express";
import { userController } from "../controller";
import { authorize, Type, validationMiddleware, authenticate } from "../middleware";
import { createUserSchema } from "../schema";

const userRoutes: Router = Router();

userRoutes.post('/users',authenticate, authorize('admin'), validationMiddleware({
    schema: createUserSchema,
    type: Type.BODY,
}), userController.registerUser);


export {userRoutes}