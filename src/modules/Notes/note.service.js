import {successResponse} from "../../common/utils/response/success.response.js";
import * as db_service from "../../DB/db.services.js";
import bookModel from "../../DB/models/book.model.js";
import notesModel from "../../DB/models/note.model.js";

export const addNote = async (req, res, next) => {
  const {title, content, bookId, page} = req.body;

  if (bookId !== undefined) {
    const book = await db_service.findOne({
      model: bookModel,
      filter: {_id: bookId},
    });
    if (!book) {
      throw new Error("Book Not Exist AnyMore ❗", {cause: 404});
    }
  }

  const note = await db_service.create({
    model: notesModel,
    data: {
      userId: req.user._id,
      title,
      content,
      bookId: bookId || null,
      page: page || null,
    },
  });
  successResponse({
    res,
    status: 201,
    message: "Note Created Successfully 🥳🥳",
    data: note,
  });
};

export const getNotes = async (req, res, next) => {
  if (!book) {
    throw new Error("Book Not Exist AnyMore ❗", {cause: 404});
  }

  const notes = await db_service.find({
    model: notesModel,
    filter: {
      userId: req.user._id,
      bookId: null,
    },
    options: {
      lean: true,
      sort: {createdAt: -1},
    },
  });

  if (!notes) {
    throw new Error("Notes Not Found ❗", {cause: 404});
  }

  successResponse({
    res,
    status: 200,
    message: "Notes Fetched Successfully 🥳🥳",
    data: notes,
  });
};

export const getBookNotes = async (req, res, next) => {
  const {bookId} = req.params;

  const notes = await db_service.find({
    model: notesModel,
    filter: {
      userId: req.user._id,
      bookId,
    },
    options: {
      lean: true,
      sort: {page: 1},
    },
  });

  if (notes.length === 0) {
    throw new Error("Notes Not Found ❗", {cause: 404});
  }

  successResponse({
    res,
    status: 200,
    message: "Book Notes Fetched Successfully 🥳🥳",
    data: notes,
  });
};

export const updateNote = async (req, res, next) => {
  const {id} = req.params;
  const {title, content, page} = req.body;
  let updatedData = {};

  const findNote = await db_service.findById({
    model: notesModel,
    id,
  });

  if (!findNote) {
    throw new Error("Note Is Not Exist ❗", {cause: 404});
  }
  if (findNote.bookId) {
    if (!page) {
      throw new Error("Page Is Required", {cause: 400});
    }
    updatedData.page = page;
  }
  if (title) updatedData.title = title;
  if (content) updatedData.content = content;

  const note = await db_service.findOneAndUpdate({
    model: notesModel,
    filter: {
      userId: req.user._id,
      _id: id,
    },
    update: updatedData,
    options: {
      lean: true,
    },
  });

  successResponse({
    res,
    message: "Note Updated Successfully 🥳🥳",
    data: note,
  });
};

export const deleteNote = async (req, res, next) => {
  const {id} = req.params;

  const note = db_service.findOneAndDelete({
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
