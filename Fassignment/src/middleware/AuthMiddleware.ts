import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { DecodedToken } from "../utils";

export interface AuthRequest extends Request {
  user?: {
    sub: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }
    // console.log(`ACCESS ROUTE  TYPE:${token} CONFIG_SECRET: ${config.jwtSecret}`)//Testing
    const decoded = jwt.verify(
      token,
      config.jwtSecret
    ) as DecodedToken;

    // console.log(`DECODE-SUB:${decoded.sub} DECODED-ROLE: ${decoded.role}`)
    if (!decoded.sub || !decoded.role) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    req.user = {
      sub: decoded.sub,
      role: decoded.role,
    };


    next();
  } catch (error: any) {
    console.error("JWT VERIFY ERROR:", error.message);
    return res.status(401).json({
      message: error.message,
    });
    }
};