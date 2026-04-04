import {Router} from "express";
import {authentication} from "../../common/middleware/Auth/authentication.middleware.js";
import {validation} from "../../common/middleware/validation/validation.middleware.js";
import * as HS from "./home.service.js";

const homeRouter = Router();

homeRouter.get("/total-progress", authentication, HS.getFavoritesProgress);
homeRouter.get("/favorites", authentication, HS.getFavorites);
homeRouter.get("/currently-reading", authentication, HS.currentlyReading);

export default homeRouter;
