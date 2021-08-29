import express from "express";
import { home } from "../controllers/videoController";
import {
    getLogin,
    postLogin,
    getJoin,
    postJoin,
} from "../controllers/userControllers/account";
import { postSearch } from "../controllers/videoControllers/search";
import { publicMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/search").post(postSearch);

rootRouter.route("/join").all(publicMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicMiddleware).get(getLogin).post(postLogin);

export default rootRouter;
