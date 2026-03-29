import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

export const checkBookIdSchema = {
  params: joi.object({
    bookId: GeneralRules.id.required(),
  }),
};
