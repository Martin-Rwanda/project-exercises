import { Response } from "express";
import { userService } from "../service";
import { CreateUserInterfaceRequest } from "../types";

export class UserController {
    async registerUser(req: CreateUserInterfaceRequest, res: Response) {
        try {
            const { name, email, age, gender, password } = req.body;

            const user = await userService.registerUser({
                name,
                email,
                age,
                gender,
                password
            });

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user
            });

        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export const userController = new UserController