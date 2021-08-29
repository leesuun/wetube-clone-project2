import express from "express";
import { watch } from "../controllers/videoControllers/watch";
import { getEdit, postEdit } from "../controllers/videoControllers/edit";
import { deleteVideo } from "../controllers/videoControllers/delete";
import { getUpload, postUpload } from "../controllers/videoControllers/upload";
import { protectMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([a-z0-9]{24})", watch);
videoRouter.get("/:id([a-z0-9]{24})/delete", protectMiddleware, deleteVideo);
videoRouter
    .route("/upload")
    .all(protectMiddleware)
    .get(getUpload)
    .post(
        videoUpload.fields([{ name: "videoFile" }, { name: "thumbFile" }]),
        postUpload
    );
videoRouter
    .route("/:id([a-z0-9]{24})/edit-video")
    .all(protectMiddleware)
    .get(getEdit)
    .post(postEdit);

export default videoRouter;
