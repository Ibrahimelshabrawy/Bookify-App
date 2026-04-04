import {Router} from "express";
import {
  multer_host,
  multer_local,
} from "../../common/middleware/multer/multer.js";
import {MulterEnum} from "../../common/utils/enum/multer.enum.js";
import validation from "../../common/middleware/validation/validation.middleware.js";
import * as BV from "./book.validation.js";
import * as BS from "./book.service.js";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";

const bookRouter = Router();

bookRouter.post(
  "/add-book",
  authentication,
  multer_host([...MulterEnum.image, ...MulterEnum.pdf]).fields([
    {name: "image", maxCount: 1},
    {name: "pdf", maxCount: 1},
  ]),
  validation(BV.addBookSchema),
  BS.addBook,
);

bookRouter.patch(
  "/edit-book/:id",
  authentication,
  validation(BV.editBookSchema),
  BS.editBook,
);

bookRouter.get(
  "/:id",
  authentication,
  validation(BV.checkBookIdSchema),
  BS.getBook,
);
bookRouter.delete(
  "/:id",
  authentication,
  validation(BV.checkBookIdSchema),
  BS.deleteBook,
);

bookRouter.get(
  "/",
  authentication,
  validation(BV.checkCategorySchema),
  BS.getBookByCategory,
);
export default bookRouter;
