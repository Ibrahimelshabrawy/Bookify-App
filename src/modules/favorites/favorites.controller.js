import {Router} from "express";
import validation from "../../common/middleware/validation/validation.middleware.js";
import * as FV from "./favorites.validation.js";
import * as FS from "./favorites.service.js";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";

const favoriteRouter = Router();

favoriteRouter.post(
  "/add-to-favorites/:bookId",
  authentication,
  validation(FV.checkBookIdSchema),
  FS.addToFavorite,
);

favoriteRouter.delete(
  "/remove-from-favorites/:bookId",
  authentication,
  validation(FV.checkBookIdSchema),
  FS.removeFromFavorites,
);

favoriteRouter.get("/", authentication, FS.getFavorites);
export default favoriteRouter;
