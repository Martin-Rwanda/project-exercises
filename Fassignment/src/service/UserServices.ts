import { UserModel } from "../model";
import { UserInterface } from "../types";
import { hashPassword } from "../utils";

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
                password: hashPassword(password)
            });

            return user.toObject();
        }

    async getUserByEmail(emailObj: { email: string }): Promise<UserInterface | null> {
        const { email } = emailObj;
        const user = await UserModel.findOne({ email });

        if (!user) return null;

        return user.toObject();
    }

    getStudents = async () => {
        const student = await UserModel.find().select('-password').exec();
        return student;
    }
}

export const userService = new UserServices;