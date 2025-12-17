import jwt from "jsonwebtoken";
import { config } from "../config";

export interface DecodedToken {
  sub: string;   
  role: string;
  iat: number;
  exp: number;
}

export const verifyToken = (token: string): DecodedToken => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;

    if (!decoded.sub || !decoded.role) {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    throw new Error("Invalid or expired token");
  }
};
