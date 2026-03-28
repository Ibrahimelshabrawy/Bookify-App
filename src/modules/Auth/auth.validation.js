import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

export const signInSchema = {
  body: joi.object({
    email: GeneralRules.email.required(),
    password: GeneralRules.password.required(),
  }),
};

export const signUpSchema = {
  body: signInSchema.body
    .append({
      firstName: GeneralRules.firstName.required(),
      lastName: GeneralRules.lastName.required(),
      bio: GeneralRules.bio,
      email: GeneralRules.email.required(),
      password: GeneralRules.password.required(),
      confirmPassword: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({
          "any.required": "Please Enter The Confirm Password",
          "any.only": "Confirm Password Must Match Password",
        }),
    })
    .required()
    .messages({
      "any.required": "Please Fill The Form",
    }),
};
