import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

export const addNoteSchema = {
  body: joi
    .object({
      content: GeneralRules.content.required(),
    })
    .required()
    .messages({
      "any.required": "Please Fill The Required Fields",
    }),
  params: joi.object({
    bookId: GeneralRules.id.required(),
  }),
};

export const updateNoteSchema = {
  body: joi
    .object({
      content: GeneralRules.content,
    })
    .required()
    .messages({
      "any.required": "Please Fill The Required Fields",
    })
    .min(1),
  params: GeneralRules.id.required(),
};

export const deleteNoteSchema = {
  params: GeneralRules.id.required(),
};
