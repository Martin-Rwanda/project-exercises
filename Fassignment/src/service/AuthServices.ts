import jwt from "jsonwebtoken";
import { BlackListedToken } from "../model";
import { config } from "../config";

interface LoginPayload {
  id: string;
  role: string;
}
export class AuthService {
  async login(user: LoginPayload): Promise<string> {
    return jwt.sign(
      { sub: user.id, role: user.role },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
  }

  async logout(token: string) {
    const decoded: any = jwt.decode(token);
    if (!decoded?.exp) return;

    await BlackListedToken.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });
  }
}

export const authService = new AuthService();
