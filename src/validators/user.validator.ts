import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { ERole } from "../enums/role.enum";

export class UserValidator {
  private static name = Joi.string().trim().min(3).max(20).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be longer than 3 characters",
    "string.max": "Name must be shorter than 20 characters",
    "any.required": "Name is required",
  });

  private static age = Joi.number().integer().min(18).max(120).messages({
    "number.base": "Age must be a number",
    "number.empty": "Age cannot be empty",
    "number.min": "Age must be greater than 18",
    "number.max": "Age must be less than 120",
    "any.required": "Age is required",
  });

  private static email = Joi.string()
    .lowercase()
    .trim()
    .email()
    .regex(regexConstant.EMAIL)
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required format",
      "any.required": "Email is required",
    });

  private static password = Joi.string().trim().min(6).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  });

  private static phone = Joi.string()
    .trim()
    .regex(regexConstant.PHONE)
    .messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Phone number must be in a valid format",
    });

  private static role = Joi.string()
    .valid(ERole.ADMIN, ERole.USER)
    .default(ERole.USER)
    .messages({
      "any.only": "Role must be either 'admin' or 'user'",
      "any.required": "Role is required",
    });

  private static isVerified = Joi.boolean().default(false).messages({
    "boolean.base": "isVerified must be a boolean",
  });

  private static isDeleted = Joi.boolean().default(false).messages({
    "boolean.base": "isDeleted must be a boolean",
  });

  public static create = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone,
    role: this.role,
    isVerified: this.isVerified,
    isDeleted: this.isDeleted,
  });

  public static update = Joi.object({
    name: this.name,
    age: this.age,
    email: this.email,
    password: this.password,
    phone: this.phone,
    role: this.role,
    isVerified: this.isVerified,
    isDeleted: this.isDeleted,
  });
}
