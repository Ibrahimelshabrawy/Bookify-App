import joi from "joi";
import {Types} from "mongoose";
import {BookEnum} from "../enum/book.enum.js";

export const GeneralRules = {
  firstName: joi.string().min(3).max(25).messages({
    "any.required": "Please Enter The First Name",
  }),
  lastName: joi.string().min(3).max(25).messages({
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

  title: joi.string().min(1).max(200).messages({
    "any.required": "Please Enter The Title",
  }),
  description: joi.string().min(1),
  content: joi.string().min(1).messages({
    "any.required": "Please Enter The Content",
  }),
  totalPages: joi.number().min(1).messages({
    "any.required": "Please Enter The Total Pages",
    "number.min": "Total Pages must be greater than or equal to 1",
  }),
  category: joi
    .string()
    .valid(...Object.values(BookEnum))
    .messages({
      "any.only":
        "Category must be one of [sports, religion, horror, eduction, other]",
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
