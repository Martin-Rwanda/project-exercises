import { Request } from "express";

export interface UserInterface {
    name: string;
    email: string;
    age: number;
    gender: string;
    role?: string;
    password: string;
    isActive: boolean;
}

export interface CreateUserBody {
    name: string;
    email: string;
    age: number;
    gender: string;
    password: string
}

export interface CreateUserInterfaceRequest extends Request {
    body: CreateUserBody;
}

export interface GetUserByEmailInterface extends Request {
    body: {
        email: string;
    };
}

export interface GetUserByIdInterface extends Request {
    params: {
        userId: string;
    };
}