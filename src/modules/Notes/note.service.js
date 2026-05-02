import {successResponse} from "../../common/utils/response/success.response.js";
import * as db_service from "../../DB/db.services.js";
import bookModel from "../../DB/models/book.model.js";
import notesModel from "../../DB/models/note.model.js";

export const addNote = async (req, res, next) => {
  const {bookId} = req.params;
  const {content} = req.body;

  const note = await db_service.create({
    model: notesModel,
    data: {
      content,
      bookId,
      userId: req.user._id,
    },
  });

  successResponse({
    res,
    status: 201,
    message: "Note Created Successfully !",
    data: note,
  });
};

export const updateNote = async (req, res, next) => {
  const {id} = req.params;
  const {content} = req.body;

  const note = await db_service.findOneAndUpdate({
    model: notesModel,
    filter: {
      userId: req.user._id,
      _id: id,
    },
    update: {content},
  });

  if (!note) {
    throw new Error("Note Not Found ! ", {cause: 404});
  }

  successResponse({
    res,
    message: "Note Updated Successfully 🥳🥳",
    data: note,
  });
};

export const deleteNote = async (req, res, next) => {
  const {id} = req.params;

  const note = await db_service.findOneAndDelete({
    model: notesModel,
    filter: {_id: id},
  });

  if (!note) {
    throw new Error("Note Is Not Exist ❗", {cause: 404});
  }

  successResponse({
    res,
    message: "Note Deleted Successfully 🥳🥳",
    status: 200,
  });
};
