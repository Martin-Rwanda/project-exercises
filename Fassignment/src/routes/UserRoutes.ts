import { Router } from "express";
import { userController } from "../controller";
import { Type, validationMiddleware, roleMiddleware, authenticate } from "../middleware";
import { createUserSchema } from "../schema";

const userRoutes: Router = Router();
/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create new user
 *        security:
 *         - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
userRoutes.post('/users', authenticate, roleMiddleware('admin'), validationMiddleware({
    schema: createUserSchema,
    type: Type.BODY,
}), userController.registerUser);

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *    security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
userRoutes.get('/users', authenticate, roleMiddleware('admin'), userController.getStudents)
export {userRoutes}