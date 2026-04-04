import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

export const addNoteSchema = {
  body: joi
    .object({
      title: GeneralRules.title.required(),
      content: GeneralRules.content.required(),
      page: GeneralRules.page,
      bookId: GeneralRules.id,
    })
    .required()
    .messages({
      "any.required": "Please Fill The Required Fields",
    }),
};

export const getBookNotesSchema = {
  params: joi
    .object({
      bookId: GeneralRules.id.required(),
    })
    .required()
    .messages({
      "any.required": "Please Fill The Required Fields",
    }),
};
