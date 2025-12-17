import { UserModel } from "../model";
import { UserInterface } from "../types";

export class UserServices {
    async registerUser(
        {name, email, age, gender, password}: 
        {name:string, email: string, age: number, gender: string, password:string}):Promise<UserInterface> {
            const emailExist = await UserModel.exists({email});
            if(emailExist) throw new Error('Email already exists');

            const user = await UserModel.create({
                name,
                email,
                age,
                gender,
                isActive: true,
                password
            });

            return user.toObject();
        }
}

export const userService = new UserServices;