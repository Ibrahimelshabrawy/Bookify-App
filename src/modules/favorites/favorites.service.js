import {populate} from "dotenv";
import {successResponse} from "../../common/utils/response/success.response.js";
import * as db_service from "../../DB/db.services.js";
import bookModel from "../../DB/models/book.model.js";
import favoriteModel from "../../DB/models/favorites.model.js";

export const addToFavorite = async (req, res, next) => {
  const {bookId} = req.params;

  const book = await db_service.findById({
    model: bookModel,
    id: bookId,
  });
  if (!book) {
    throw new Error("Book Not Exist ❗", {cause: 400});
  }

  const favorite = await db_service.create({
    model: favoriteModel,
    data: {
      userId: req.user._id,
      bookId,
    },
  });
  successResponse({
    res,
    status: 201,
    message: "Added To Favorites Successfully ❤️",
    data: favorite,
  });
};

export const removeFromFavorites = async (req, res, next) => {
  const {bookId} = req.params;

  const book = await db_service.findById({
    model: bookModel,
    id: bookId,
  });

  if (!book) {
    throw new Error("Book Not Exist ❗", {cause: 404});
  }

  const favorite = await db_service.findOneAndDelete({
    model: favoriteModel,
    filter: {bookId, userId: req.user._id},
  });

  if (!favorite) {
    throw new Error("Favorite Not Found ❗", {cause: 404});
  }
  successResponse({
    res,
    status: 200,
    message: "Book Removed Successfully From Favorites 🗑️",
  });
};

export const getFavorites = async (req, res, next) => {
  const findFavorites = await db_service.find({
    model: favoriteModel,
    filter: {
      userId: req.user._id,
    },
    options: {
      populate: [
        {
          path: "bookId",
          select:
            "_id title description totalPages category image pdf createdAt",
        },
      ],
    },
  });
  const favorite = findFavorites.map((fav) => fav.bookId);

  successResponse({
    res,
    message: "Favorites Retrieved Successfully 📚",
    data: {favorite},
  });
};
