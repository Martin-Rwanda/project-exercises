import * as bycrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const hashPassword = (password: string): string => {
    return bycrypt.hashSync(password, 10);
}

export const comparePassword = async (
    db_password: string,
    password: string
): Promise<boolean> => {
    return await bycrypt.compare(password, db_password);
}

interface GenerateTokenPayload {
    id: string,
    role: string
}

// export const generateToken = async ({id, role}: GenerateTokenPayload) => {
//     return jwt.sign(
//         {
//             sub: id,
//             role,
//         },
//         config.jwtSecret,
//         { expiresIn: 3600}
//     )
// }

export const generateToken = async ({ id, role }: GenerateTokenPayload) => {
  return jwt.sign(
    {
      sub: id,   
      role       
    },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
};