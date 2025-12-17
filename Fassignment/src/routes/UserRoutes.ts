import { Router } from "express";
import { userController } from "../controller";
import { authorize, Type, validationMiddleware } from "../middleware";
import { createUserSchema } from "../schema";

const userRoutes: Router = Router();

userRoutes.post('/users',authorize('admin'), validationMiddleware({
    schema: createUserSchema,
    type: Type.BODY,
}), userController.registerUser);


export {userRoutes}