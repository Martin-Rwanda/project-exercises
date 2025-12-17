import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export enum Type {
    BODY = 'body',
    PARAMS = 'params',
    QUERY = 'query'
}

interface JoiRequestType<T>{
    schema: ObjectSchema<T>;
    type: Type
}

export const validationMiddleware = <T>({
    schema,
    type,
}: JoiRequestType<T>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const data = req[type];
        const validates = schema.validate(data);
        if (validates.error){
            res.status(400).json({
                message: validates.error.details
            });
        }
        next();
    };
};