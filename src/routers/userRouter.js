import express from "express";
import { format } from "morgan";
import { logout } from "../controllers/userControllers/account";
import { profile } from "../controllers/userControllers/profile";
import { getEdit, postEdit } from "../controllers/userControllers/edit";
import {
    avatarUpload,
    protectMiddleware,
    publicMiddleware,
} from "../middlewares";

import {
    gitLoginStart,
    gitLoginFinish,
    kakaoLoginStart,
    kakaoLoginFinish,
} from "../controllers/userControllers/socialLogin";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter.get("/github/start", publicMiddleware, gitLoginStart);
userRouter.get("/github/finish", publicMiddleware, gitLoginFinish);

userRouter.get("/kakao/start", publicMiddleware, kakaoLoginStart);
userRouter.get("/kakao/finish", publicMiddleware, kakaoLoginFinish);

userRouter.get("/:id([a-z0-9]{24})/profile", profile);
userRouter
    .route("/:id([a-z0-9]{24})/edit-profile")
    .all(protectMiddleware)
    .get(getEdit)
    .post(avatarUpload.single("avatar"), postEdit);

export default userRouter;
