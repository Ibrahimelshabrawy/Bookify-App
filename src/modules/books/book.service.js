import {PDFParse} from "pdf-parse";
import * as db_service from "../../DB/db.services.js";
import bookModel from "../../DB/models/book.model.js";
import {successResponse} from "../../common/utils/response/success.response.js";
import {normalizePath} from "../../common/middleware/multer/multer.js";
import favoriteModel from "../../DB/models/favorites.model.js";

export const addBook = async (req, res, next) => {
  const {title, description, totalPages, category} = req.body;
  let imagePath = null;
  let pdfPath = null;
  let pagesCount = totalPages;

  //   console.log(req.files.image);

  if (req.files?.image) {
    imagePath = normalizePath(req.files.image[0].path);
  }
  if (req.files?.pdf) {
    pdfPath = normalizePath(req.files.pdf[0].path);
    const parser = new PDFParse({url: pdfPath});
    const result = await parser.getInfo({parsePageInfo: true});
    await parser.destroy();
    pagesCount = result.total;
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
      image: imagePath,
      pdf: pdfPath,
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

  const updatedData = {};
  let pagesCount = totalPages;

  if (req.files?.image) {
    updatedData.image = normalizePath(req.files.image[0].path);
  }

  if (req.files?.pdf) {
    const pdfPath = normalizePath(req.files.pdf[0].path);
    const parser = new PDFParse({url: pdfPath});
    const result = await parser.getInfo({parsePageInfo: true});
    await parser.destroy();
    pagesCount = result.total;

    updatedData.pdf = pdfPath;
    updatedData.totalPages = pagesCount;
  } else if (totalPages) {
    updatedData.totalPages = pagesCount;
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

  if (!book) {
    throw new Error("Book Is Not Exist Or You Are Not Authorized ❗", {
      cause: 404,
    });
  }
  successResponse({
    res,
    status: 200,
    message: "Book Updated Successfully 🥳🥳",
    data: book,
  });
};

export const getBook = async (req, res, next) => {
  const {id} = req.params;

  const book = await db_service.findOne({
    model: bookModel,
    filter: {_id: id, createdBy: req.user._id},
  });
  if (!book) {
    throw new Error("Book Not Exist Or You Are Not Authorized", {cause: 400});
  }

  const favorite = await db_service.findOne({
    model: favoriteModel,
    filter: {
      bookId: id,
      userId: req.user._id,
    },
  });

  successResponse({
    res,
    status: 200,
    message: "Book Fetched Successfully 🥳🥳",
    data: {book, isFavorite: !!favorite},
  });
};
