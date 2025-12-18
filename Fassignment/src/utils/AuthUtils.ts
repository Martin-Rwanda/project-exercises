import { config } from "../config";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  sub: string;
  role: string;
}

// export const validateToken = (token: string): DecodedToken => {
//   const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;
//   if (!decoded.sub || !decoded.role) {
//     throw new Error("Invalid token payload");
//   }

//   return decoded;
// };