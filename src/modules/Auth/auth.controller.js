import {Router} from "express";
import {validation} from "../../common/middleware/validation/validation.middleware.js";
import * as AS from "./auth.services.js";
import * as AV from "./auth.validation.js";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";
const authRouter = Router();

authRouter.post("/signup", validation(AV.signUpSchema), AS.signUp);
authRouter.post("/signin", validation(AV.signInSchema), AS.signIn);
authRouter.post("/logout", authentication, AS.logout);

export default authRouter;
