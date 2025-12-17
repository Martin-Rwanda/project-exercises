import Joi from "joi";
import { UserInterface } from "../types";

const userBaseSchema = {
  name: Joi.string().min(3).required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "any.required": "Name is required"
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Email format is invalid",
      "any.required": "Email is required"
    }),
  age: Joi.number()
    .integer()
    .required()
    .messages({
        "string.base": "Age must be a number",
        "string.empty": "Age is required",
    }),
  gender: Joi.string()
    .required()
    .messages({
        "string.base": "Gender must be a string",
        "string.empty": "Gender is required",
    }),
  role: Joi.string()
    .required()
    .messages({
      "string.base": "Must be string",
      "string.empy": "Role is required"
    }),
  isActive: Joi.boolean()
    .optional()
    .messages({
        "string.base": "Status must be boolean"
    }),

  password: Joi.string()
    .min(5)
    .required()
    // .regex(RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$"))
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 5 characters",
      "any.required": "Password is required"
    }),
};


export const createUserSchema = Joi.object<UserInterface>({
    name: userBaseSchema.name.required(),
    email: userBaseSchema.email.required(),
    age: userBaseSchema.age.required(),
    gender: userBaseSchema.gender.required(),
    isActive: userBaseSchema.isActive.optional(),
    password: userBaseSchema.password.required()
})


export const updateUserSchema = Joi.object({
  name: userBaseSchema.name.optional(),
  email: userBaseSchema.email.optional(),
  age: userBaseSchema.age.optional(),
  gender: userBaseSchema.gender.optional(),
  isActive: userBaseSchema.isActive.optional(),
  password: Joi.forbidden(), 
});

export const paramsSchema = Joi.object({
  studentId: Joi.string().required()
});