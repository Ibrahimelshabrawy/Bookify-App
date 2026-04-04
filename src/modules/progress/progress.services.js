import {ProgressStatusEnum} from "../../common/utils/enum/progress.enum.js";
import {successResponse} from "../../common/utils/response/success.response.js";
import * as db_service from "../../DB/db.services.js";
import progressModel from "../../DB/models/progress.model.js";

export const createProgress = async (req, res, next) => {
  const {bookId} = req.params;

  const progress = await db_service.create({
    model: progressModel,
    data: {
      userId: req.user._id,
      bookId,
    },
  });

  successResponse({
    res,
    status: 201,
    message: "Reading Started 📖",
    data: progress,
  });
};

export const updateProgress = async (req, res, next) => {
  const {bookId} = req.params;
  const {currentPage} = req.body;

  const progress = await db_service.findOne({
    model: progressModel,
    filter: {bookId, userId: req.user._id},
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

  if (!progress) {
    throw new Error("Progress Not Found ❗", {cause: 404});
  }

  progress.currentPage = currentPage;

  if (currentPage >= progress.bookId.totalPages) {
    progress.status = ProgressStatusEnum.completed;
  } else {
    progress.status = ProgressStatusEnum.reading;
  }
  await progress.save();

  const percentage = Number(
    Math.min(100, Math.round((currentPage / progress.bookId.totalPages) * 100)),
  );

  successResponse({
    res,
    status: 200,
    message: "Progress Updated Successfully 🥳🥳",
    data: {progress, percentage},
  });
};
