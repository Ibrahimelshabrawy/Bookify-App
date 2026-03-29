import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

export const addBookSchema = {
  body: joi
    .object({
      title: GeneralRules.title.required(),
      description: GeneralRules.description,
      totalPages: GeneralRules.totalPages,
      category: GeneralRules.category.required(),
      image: GeneralRules.file,
      pdf: GeneralRules.file,
    })
    .required()
    .messages({
      "any.required": "Please Fill The Required Fields",
    }),
};

export const editBookSchema = {
  body: joi
    .object({
      title: GeneralRules.title.required(),
      description: GeneralRules.description,
      totalPages: GeneralRules.totalPages.required(),
      category: GeneralRules.category,
      image: GeneralRules.file,
      pdf: GeneralRules.file,
    })
    .min(1),
  params: GeneralRules.id.required(),
};

export const getBookSchema = {
  params: GeneralRules.id.required(),
};
