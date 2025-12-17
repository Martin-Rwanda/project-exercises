import { generateToken } from "../utils";
import jwt from 'jsonwebtoken';
import { BlackListedToken } from "../model";

export class AuthService {
    async login(user: {_id:string; role:string}): Promise<string> {
        return generateToken({id: user._id, role: user.role});
    }

    async logout(token:string) {
        const decode: any = jwt.decode(token);

        if(!decode?.exp) return;

        await BlackListedToken.create({
            token,
            expiresAt: new Date(decode.exp * 1000),
        });
    }
}

export const authService = new AuthService;