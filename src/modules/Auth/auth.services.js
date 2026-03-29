import {ACCESS_SECRET_KEY, SALT_ROUND} from "../../../config/config.service.js";
import {
  compare_match,
  Hash,
} from "../../common/utils/Security/hash.security.js";
import * as db_service from "../../DB/db.services.js";
import * as redis_service from "../../DB/redis/redis.services.js";
import userModel from "../../DB/models/user.model.js";
import {successResponse} from "../../common/utils/response/success.response.js";
import {GenerateToken} from "../../common/utils/jwt/token.service.js";
import {randomUUID} from "crypto";
import {LogOutEnum} from "../../common/utils/enum/auth.enum.js";

export const signUp = async (req, res, next) => {
  const {firstName, lastName, bio, email, password} = req.body;

  const userExist = await db_service.findOne({
    model: userModel,
    filter: {email},
  });
  if (userExist) {
    throw new Error("Email Already Exist", {cause: 409});
  }

  const user = await db_service.create({
    model: userModel,
    data: {
      firstName,
      lastName,
      email,
      password: await Hash({plainText: password, salt_rounds: SALT_ROUND}),
      bio,
    },
  });

  successResponse({
    res,
    message: "Sign Up Successfully Enjoy 🥳",
    status: 200,
    data: {user},
  });
};

export const signIn = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await db_service.findOne({
    model: userModel,
    filter: {email},
    options: {lean: true},
  });

  if (!user) {
    throw new Error("User Not Found ❗", {cause: 404});
  }

  if (
    !(await compare_match({plainText: password, cipherText: user.password}))
  ) {
    throw new Error("Invalid Password ❗", {cause: 400});
  }

  const jwtid = randomUUID();

  const access_token = GenerateToken({
    payload: {id: user._id},
    secret_key: ACCESS_SECRET_KEY,
    options: {
      jwtid,
    },
  });

  successResponse({
    res,
    message: "Sign In Successfully Enjoy 🥳",
    status: 200,
    data: {access_token},
  });
};

export const logout = async (req, res, next) => {
  const {flag} = req.query;
  switch (flag) {
    case LogOutEnum.all:
      req.user.changeCredential = new Date();
      await req.user.save();

      // Delete From Cache
      await redis_service.deleteKey(
        redis_service.keys(redis_service.getKeyUserId({userId: req.user._id})),
      );
      break;
    default:
      await redis_service.set({
        key: redis_service.revokeKey({
          userId: req.user._id,
          jti: req.verify.jti,
        }),
        value: `${req.verify.jti}`,
        ttl: req.verify.exp - Math.floor(Date.now() / 1000),
      });
      break;
  }
  successResponse({res});
};
// // -------------------------------------------------------------------------------------------------------------------------------
