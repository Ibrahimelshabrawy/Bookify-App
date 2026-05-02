import {Router} from "express";
import validation from "../../common/middleware/validation/validation.middleware.js";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";
import * as NS from "./note.service.js";
import * as NV from "./note.validation.js";

const noteRouter = Router();

noteRouter.post(
  "/add-note/:bookId",
  authentication,
  validation(NV.addNoteSchema),
  NS.addNote,
);

noteRouter.patch(
  "/update-note/:id",
  authentication,
  validation(NV.updateNoteSchema),
  NS.updateNote,
);
noteRouter.delete(
  "/delete-note/:id",
  authentication,
  validation(NV.deleteNoteSchema),
  NS.deleteNote,
);

export default noteRouter;
