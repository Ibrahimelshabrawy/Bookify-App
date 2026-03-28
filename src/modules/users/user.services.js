// import {findOne} from "../../DB/db.services.js";

// // -------------------------------------------------------------------------------------------------------------------------------

// // export const updateProfile = async (req, res, next) => {
// //   let {firstName, lastName, gender, phone} = req.body;
// //   const {id} = req.params;
// //   if (phone) {
// //     phone = await encrypt(phone);
// //   }
// //   const user = await db_service.findOneAndUpdate({
// //     model: userModel,
// //     filter: {_id: id},
// //     update: {firstName, lastName, gender, phone},
// //     select: "-password",
// //   });
// //   if (!user) {
// //     throw new Error("User Not Exist", {cause: 404});
// //   }

// //   await redis_service.deleteKey(`profile::${req.user._id}`);

// //   successResponse({
// //     res,
// //     status: 200,
// //     message: "User Updated Successfully",
// //     data: user,
// //   });
// // };
// // -------------------------------------------------------------------------------------------------------------------------------
// // export const getProfile = async (req, res, next) => {
// //   req.user.phone = await decrypt(req.user.phone);
// //   const userExist = await redis_service.get(
// //     redis_service.getUserProfile({userId: req.user._id}),
// //   );
// //   if (userExist) {
// //     return successResponse({
// //       res,
// //       status: 200,
// //       message: "User Profile",
// //       data: req.user,
// //     });
// //   }
// //   await redis_service.set({
// //     key,
// //     value: req.user,
// //     ttl: 60 * 3,
// //   });

// //   successResponse({
// //     res,
// //     status: 200,
// //     message: "User Profile",
// //     data: req.user,
// //   });
// // };
// // -------------------------------------------------------------------------------------------------------------------------------

// // export const deleteByUser = async (req, res, next) => {
// //   await db_service.deleteOne({
// //     model: userModel,
// //     filter: {_id: req.user._id},
// //   });
// //   deleteFile(req.user.profilePicture);
// //   deleteFiles(req.user.coverPictures);

// //   successResponse({
// //     res,
// //     status: 200,
// //     message: "User Deleted Successfully🥳🥳",
// //   });
// // };
