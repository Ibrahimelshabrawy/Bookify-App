import {Router} from "express";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";
import * as US from "./user.services.js";
const userRouter = Router();

userRouter.get("/profile", authentication, US.getProfile);
userRouter.patch("/update-profile", authentication, US.updateProfile);
userRouter.delete("/delete-profile", authentication, US.deleteProfile);

export default userRouter;
