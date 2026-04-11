import {Router} from "express";
import validation from "../../common/middleware/validation/validation.middleware.js";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";
import * as NS from "./note.service.js";
import * as NV from "./note.validation.js";

const noteRouter = Router();

noteRouter.post(
  "/add-note",
  authentication,
  validation(NV.addNoteSchema),
  NS.addNote,
);

noteRouter.get("/", authentication, NS.getNotes);
noteRouter.get(
  "/book/:bookId",
  authentication,
  validation(NV.getBookNotesSchema),
  NS.getBookNotes,
);
noteRouter.patch("/update-note/:id", authentication, NS.updateNote);
noteRouter.delete("/delete-note/:id", authentication, NS.deleteNote);

export default noteRouter;
