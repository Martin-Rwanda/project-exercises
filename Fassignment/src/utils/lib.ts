import { config } from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = async (
  dbPassword: string,
  password: string
): Promise<boolean> => {
  return bcrypt.compare(password, dbPassword);
};

interface GenerateTokenPayload {
  id: string;
  role: string;
}

export const generateToken = ({ id, role }: GenerateTokenPayload): string => {
  return jwt.sign(
    {
      sub: id,
      role,
    },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );
};