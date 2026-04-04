import {ProgressStatusEnum} from "../../common/utils/enum/progress.enum.js";
import * as db_service from "../../DB/db.services.js";
import favoriteModel from "../../DB/models/favorites.model.js";
import progressModel from "../../DB/models/progress.model.js";
import {successResponse} from "../../common/utils/response/success.response.js";

export const getFavoritesProgress = async (req, res, next) => {
  const userId = req.user._id;
  let completed = 0;

  const favorites = await db_service.find({
    model: favoriteModel,
    filter: {userId},
    select: "bookId",
  });

  const favoritesBookIds = favorites.map((item) => item.bookId);
  const totalFavorites = favoritesBookIds.length;

  if (totalFavorites > 0) {
    completed = await db_service.countDocuments({
      model: progressModel,
      filter: {
        userId,
        bookId: {$in: favoritesBookIds},
        status: ProgressStatusEnum.completed,
      },
    });
  }
  const percentage =
    totalFavorites === 0 ? 0 : Math.round((completed / totalFavorites) * 100);

  successResponse({
    res,
    status: 200,
    message: "Total Progress Fetched Successfully 🥳🥳",
    data: {
      completed,
      totalFavorites,
      percentage,
    },
  });
};

export const getFavorites = async (req, res, next) => {
  const favorite = await db_service.find({
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
      lean: true,
    },
  });

  const favorites = favorite.map((fav) => fav.bookId);
  const favoritesCount = favorite.length;

  successResponse({
    res,
    message: "Favorites Retrieved Successfully 📚",
    data: {favoritesCount, favorites},
  });
};

export const currentlyReading = async (req, res, next) => {
  const userId = req.user._id;

  const progresses = await db_service.find({
    model: progressModel,
    filter: {
      userId,
      status: ProgressStatusEnum.reading,
    },
    select: "currentPage bookId",
    options: {
      populate: [
        {
          path: "bookId",
          select: "_id title description totalPages category image pdf",
        },
      ],
      lean: true,
    },
  });

  const totalProgress = progresses.map((book) => ({
    book: book.bookId,
    pages: `${book.currentPage} / ${book.bookId.totalPages}`,
    percentage:
      book.bookId.totalPages > 0
        ? Math.round((book.currentPage / book.bookId.totalPages) * 100)
        : 0,
  }));

  successResponse({
    res,
    status: 200,
    message: "Recently Reading Books Fetched Successfully 🥳🥳",
    data: totalProgress,
  });
};
