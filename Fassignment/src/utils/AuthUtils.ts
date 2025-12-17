import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JwtPayload {
    sub: string,
    role: string
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
}