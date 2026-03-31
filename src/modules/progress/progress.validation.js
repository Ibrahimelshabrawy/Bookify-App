import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

export const checkBookIdSchema = {
  params: joi
    .object({
      bookId: GeneralRules.id.required().messages({
        "any.required": "Book Id Is Required In Params ❗",
      }),
    })
    .required(),
};

export const updateProgressSchema = {
  body: joi
    .object({
      currentPage: joi.number().required().messages({
        "any.required": "Current Page Is Required❗",
      }),
    })
    .required()
    .messages({
      "any.required": "Body Is Required❗",
    }),
  params: joi
    .object({
      bookId: GeneralRules.id.required().messages({
        "any.required": "Book Id Is Required In Params ❗",
      }),
    })
    .required(),
};
