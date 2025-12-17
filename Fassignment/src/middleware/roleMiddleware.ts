import { Response, NextFunction } from "express";
import { AuthRequest } from "./AuthMiddleware";

export const authorize = (...allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction)=> {
    if(!req.user){
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    if(!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            message: "Forbidden: You don't have permission"
        })
    }
    next();
};