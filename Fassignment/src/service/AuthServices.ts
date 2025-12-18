import { config } from "../config";
import jwt from "jsonwebtoken";
import { BlackListedToken } from "../model";

interface LoginPayload {
  sub: string;
  role: string;
}
export class AuthService {
  async login(user: LoginPayload): Promise<string> {
    console.log(`USER-ID: ${user.sub} and USER-ROLE: ${user.role}  CONFIG-SECRET: ${config.jwtSecret}`) //Testing
    return jwt.sign(
      { sub: user.sub, role: user.role },
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
