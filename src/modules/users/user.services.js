import * as db_service from "../../DB/db.services.js";
import bookModel from "../../DB/models/book.model.js";
import favoriteModel from "../../DB/models/favorites.model.js";
import userModel from "../../DB/models/user.model.js";
import {successResponse} from "../../common/utils/response/success.response.js";
// // -------------------------------------------------------------------------------------------------------------------------------

export const getProfile = async (req, res, next) => {
  const {password, ...user} = req.user._doc;

  const [bookCount, favoriteCount] = await Promise.all([
    db_service.countDocuments({
      model: bookModel,
      filter: {createdBy: req.user._id},
    }),
    db_service.countDocuments({
      model: favoriteModel,
      filter: {userId: req.user._id},
    }),
  ]);

  successResponse({
    res,
    status: 200,
    message: "User Profile",
    data: {user, favoriteCount, bookCount},
  });
};

export const updateProfile = async (req, res, next) => {
  let {firstName, lastName, bio} = req.body;

  const user = await db_service.findOneAndUpdate({
    model: userModel,
    filter: {_id: req.user._id},
    update: {firstName, lastName, bio},
    select: "-password",
  });
  if (!user) {
    throw new Error("User Not Exist", {cause: 404});
  }

  successResponse({
    res,
    status: 200,
    message: "User Updated Successfully",
    data: user,
  });
};

export const deleteProfile = async (req, res, next) => {
  await db_service.deleteMany({
    model: bookModel,
    filter: {createdBy: req.user._id},
  });
  await db_service.deleteMany({
    model: favoriteModel,
    filter: {userId: req.user._id},
  });

  await db_service.deleteOne({
    model: userModel,
    filter: {_id: req.user._id},
  });

  successResponse({
    res,
    status: 200,
    message: "User Deleted Successfully🥳🥳",
  });
};
