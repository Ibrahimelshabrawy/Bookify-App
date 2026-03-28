import joi from "joi";
import {Types} from "mongoose";

export const GeneralRules = {
  firstName: joi.string().min(3).max(20).messages({
    "any.required": "Please Enter The First Name",
  }),
  lastName: joi.string().min(3).max(20).messages({
    "any.required": "Please Enter The Last Name",
  }),
  bio: joi.string().min(3).max(150),
  email: joi.string().email().trim().messages({
    "any.required": "Please Enter The Email",
    "string.email": "Email Must Be In Email Format (johnDoe@example.com)",
  }),
  password: joi.string().min(6).max(25).messages({
    "any.required": "Please Enter The Password",
  }),

  file: joi
    .object({
      fieldname: joi.string(),
      originalname: joi.string(),
      encoding: joi.string(),
      mimetype: joi.string(),
      destination: joi.string(),
      filename: joi.string(),
      path: joi.string(),
      size: joi.number(),
    })
    .messages({
      "any.required": "File is required",
    }),

  id: joi.custom((value, helper) => {
    const isValid = Types.ObjectId.isValid(value);
    return isValid ? value : helper.message("Invalid ID 😥");
  }),
};
