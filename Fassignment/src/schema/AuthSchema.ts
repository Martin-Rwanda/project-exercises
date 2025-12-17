import Joi from "joi";
import { LoginInterface } from "../types";

const AuthBaseSchema = {
  email: Joi.string()
    .email()
    .required()
    .messages({
      "any.required": "Email is required"
    }),
  password: Joi.string()
      .min(5)
      .required()
      .messages({
        "any.required": "Please Password is required"
      }),
}

export const LoginValidation = Joi.object<LoginInterface>({
    email: AuthBaseSchema.email.required(),
    password: AuthBaseSchema.password.required()
})