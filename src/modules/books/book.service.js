import fs from "fs";
import {PDFDocument} from "pdf-lib";
import * as db_service from "../../DB/db.services.js";
import bookModel from "../../DB/models/book.model.js";
import {successResponse} from "../../common/utils/response/success.response.js";
import favoriteModel from "../../DB/models/favorites.model.js";
import cloudinary from "../../common/utils/cloudinary/cloudinary.js";
import progressModel from "../../DB/models/progress.model.js";
import notesModel from "../../DB/models/note.model.js";

export const addBook = async (req, res, next) => {
  const {title, description, totalPages, category} = req.body;
  let imageData = null;
  let pdfData = null;
  let pagesCount = totalPages;

  if (req.files?.image) {
    const imageUpload = await cloudinary.uploader.upload(
      req.files.image[0].path,
      {
        folder: "Bookify/Images",
        resource_type: "image",
      },
    );
    imageData = {
      secure_url: imageUpload.secure_url,
      public_id: imageUpload.public_id,
    };
  }
  if (req.files?.pdf) {
    const dataBuffer = fs.readFileSync(req.files.pdf[0].path);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    pagesCount = pdfDoc.getPageCount();

    const pdfUpload = await cloudinary.uploader.upload(req.files.pdf[0].path, {
      folder: "Bookify/Pdfs",
      resource_type: "auto",
    });
    pdfData = {
      secure_url: pdfUpload.secure_url,
      public_id: pdfUpload.public_id,
    };
  }

  if (!pagesCount) {
    throw new Error("Total Pages Is Required, Please Enter It ❗", {
      cause: 400,
    });
  }

  const book = await db_service.create({
    model: bookModel,
    data: {
      title,
      description,
      category,
      totalPages: pagesCount,
      image: imageData,
      pdf: pdfData,
      createdBy: req.user._id,
    },
    options: {
      lean: true,
    },
  });

  successResponse({
    res,
    message: "Book Created Successfully 🥳🥳",
    status: 201,
    data: book,
  });
};

export const editBook = async (req, res, next) => {
  const {title, category, description, totalPages} = req.body;
  const {id} = req.params;

  const oldBook = await db_service.findOne({
    model: bookModel,
    filter: {
      _id: id,
      createdBy: req.user._id,
    },
  });

  if (!oldBook) {
    throw new Error("Book Is Not Exist ❗", {
      cause: 404,
    });
  }

  if (req.files?.pdf || req.files?.image) {
    throw new Error("PDF or Image cannot be updated after book creation ❗", {
      cause: 400,
    });
  }

  const updatedData = {};
  if (totalPages) {
    if (oldBook?.pdf?.secure_url) {
      throw new Error("Cannot update totalPages when book has PDF❗", {
        cause: 400,
      });
    }

    updatedData.totalPages = totalPages;
  }

  if (title) updatedData.title = title;
  if (description) updatedData.description = description;
  if (category) updatedData.category = category;

  const book = await db_service.findOneAndUpdate({
    model: bookModel,
    filter: {_id: id, createdBy: req.user._id},
    update: updatedData,
    options: {
      lean: true,
    },
  });

  successResponse({
    res,
    status: 200,
    message: "Book Updated Successfully 🥳🥳",
    data: book,
  });
};

export const getBook = async (req, res, next) => {
  const {id} = req.params;
  let progressInfo = {};

  const book = await db_service.findOne({
    model: bookModel,
    filter: {_id: id},
  });
  if (!book) {
    throw new Error("Book Not Exist ❗", {cause: 404});
  }

  const favorite = await db_service.findOne({
    model: favoriteModel,
    filter: {
      bookId: id,
      userId: req.user._id,
    },
  });
  const notes = await db_service.find({
    model: notesModel,
    filter: {
      bookId: id,
      userId: req.user._id,
    },
  });

  const progress = await db_service.findOne({
    model: progressModel,
    filter: {bookId: id, userId: req.user._id},
    options: {
      populate: [
        {
          path: "bookId",
          select: "totalPages",
        },
      ],
    },
  });

  if (progress) {
    const percentage = Math.min(
      100,
      Math.round((progress?.currentPage / progress?.bookId.totalPages) * 100),
    );

    progressInfo = {
      percentage,
      currentPage: progress.currentPage,
      status: progress.status,
    };
  }

  successResponse({
    res,
    status: 200,
    message: "Book Fetched Successfully 🥳🥳",
    data: {book, notes, progressInfo, isFavorite: !!favorite},
  });
};

export const deleteBook = async (req, res, next) => {
  const {id} = req.params;

  const book = await db_service.findOne({
    model: bookModel,
    filter: {
      _id: id,
      createdBy: req.user._id,
    },
  });

  if (!book) {
    throw new Error("Book Not Exist❗", {
      cause: 404,
    });
  }

  if (book?.image?.public_id) {
    await cloudinary.uploader.destroy(book.image.public_id, {
      resource_type: "image",
    });
  }

  if (book?.pdf?.public_id) {
    await cloudinary.uploader.destroy(book.pdf.public_id, {
      resource_type: "image",
    });
  }

  await db_service.deleteMany({
    model: progressModel,
    filter: {bookId: id},
  });

  await db_service.deleteMany({
    model: favoriteModel,
    filter: {bookId: id},
  });
  await db_service.deleteMany({
    model: notesModel,
    filter: {bookId: id},
  });

  await db_service.findOneAndDelete({
    model: bookModel,
    filter: {_id: id},
  });

  successResponse({
    res,
    status: 200,
    message: "Book Deleted Successfully 🗑️",
  });
};

export const getBooks = async (req, res, next) => {
  const {page = 1, limit = 10, category} = req.query;

  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const filter = {
    createdBy: req.user._id,
  };

  if (category) {
    filter.category = category;
  }

  const books = await db_service.find({
    model: bookModel,
    filter,
    options: {
      lean: true,
      sort: {createdAt: -1},
      limit,
      skip,
    },
  });

  if (books.length === 0) {
    throw new Error(`Books Not Found`, {cause: 404});
  }

  successResponse({
    res,
    status: 200,
    message: `Books Fetched Successfully 🥳🥳`,
    data: books,
  });
};
