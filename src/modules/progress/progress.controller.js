import {Router} from "express";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";
import {validation} from "../../common/middleware/validation/validation.middleware.js";
import * as PV from "./progress.validation.js";
import * as PS from "./progress.services.js";

const progressRouter = Router();

progressRouter.post(
  "/create-progress/:bookId",
  authentication,
  validation(PV.checkBookIdSchema),
  PS.createProgress,
);
progressRouter.patch(
  "/update-progress/:bookId",
  authentication,
  validation(PV.updateProgressSchema),
  PS.updateProgress,
);

export default progressRouter;
