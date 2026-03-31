import joi from "joi";
import {GeneralRules} from "../../common/utils/helpers/generalRules.validation.js";

const updateProfileSchema = {
  body: joi
    .object({
      firstName: GeneralRules.firstName,
      lastName: GeneralRules.lastName,
      bio: GeneralRules.bio,
    })
    .min(1),
};
