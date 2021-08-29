"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _watch = require("../controllers/videoControllers/watch");

var _edit = require("../controllers/videoControllers/edit");

var _delete = require("../controllers/videoControllers/delete");

var _upload = require("../controllers/videoControllers/upload");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/:id([a-z0-9]{24})", _watch.watch);
videoRouter.get("/:id([a-z0-9]{24})/delete", _middlewares.protectMiddleware, _delete.deleteVideo);
videoRouter.route("/upload").all(_middlewares.protectMiddleware).get(_upload.getUpload).post(_middlewares.videoUpload.fields([{
  name: "videoFile"
}, {
  name: "thumbFile"
}]), _upload.postUpload);
videoRouter.route("/:id([a-z0-9]{24})/edit-video").all(_middlewares.protectMiddleware).get(_edit.getEdit).post(_edit.postEdit);
var _default = videoRouter;
exports["default"] = _default;