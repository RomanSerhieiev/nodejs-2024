import Joi from "joi";

import { ERole } from "../enums/role.enum";

const createDto = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be longer than 3 characters",
    "any.required": "Name is required",
  }),
  age: Joi.number().integer().min(1).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be greater than 0",
    "any.required": "Age is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  phone: Joi.string().optional(),
  role: Joi.string()
    .valid(ERole.ADMIN, ERole.USER)
    .default(ERole.USER)
    .messages({
      "any.only": "Role must be either 'admin' or 'user'",
    }),
  isVerified: Joi.boolean().default(false),
  isDeleted: Joi.boolean().default(false),
});

const updateDto = Joi.object({
  name: Joi.string().min(3).optional(),
  age: Joi.number().integer().min(1).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  phone: Joi.string().optional(),
  role: Joi.string().valid(ERole.ADMIN, ERole.USER).optional(),
  isVerified: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

export { createDto, updateDto };
