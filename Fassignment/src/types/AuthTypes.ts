import { Request } from "express";

export interface LoginInterface {
    email: string,
    password: string
}

export interface LogingInterfaceRequest extends Request {
    body: LoginInterface
}