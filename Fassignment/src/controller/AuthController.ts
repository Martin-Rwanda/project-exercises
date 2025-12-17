import { Request, Response } from "express";
import { LogingInterfaceRequest, LoginInterface } from "../types";
import { comparePassword } from "../utils";
import { authService, userService } from "../service";
import { AuthRequest } from "../middleware";

export class AuthController {
  async login(req: LogingInterfaceRequest, res: Response) {
    try {
      const { email, password } = req.body as LoginInterface;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await userService.getUserByEmail({ email });

      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await comparePassword(user.password, password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = await authService.login({ _id: user._id.toString(), role: user.role || ''});

      return res.status(200).json({
        message: "Login successful",
        data: { token },
      });

    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async logout(req: AuthRequest, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(400).json({ message: "Authorization header missing" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Token missing" });
      }
      await authService.logout(token);

      return res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const authController = new AuthController