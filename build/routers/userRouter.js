"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = require("morgan");

var _account = require("../controllers/userControllers/account");

var _profile = require("../controllers/userControllers/profile");

var _edit = require("../controllers/userControllers/edit");

var _middlewares = require("../middlewares");

var _socialLogin = require("../controllers/userControllers/socialLogin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/logout", _middlewares.protectMiddleware, _account.logout);
userRouter.get("/github/start", _middlewares.publicMiddleware, _socialLogin.gitLoginStart);
userRouter.get("/github/finish", _middlewares.publicMiddleware, _socialLogin.gitLoginFinish);
userRouter.get("/kakao/start", _middlewares.publicMiddleware, _socialLogin.kakaoLoginStart);
userRouter.get("/kakao/finish", _middlewares.publicMiddleware, _socialLogin.kakaoLoginFinish);
userRouter.get("/:id([a-z0-9]{24})/profile", _profile.profile);
userRouter.route("/:id([a-z0-9]{24})/edit-profile").all(_middlewares.protectMiddleware).get(_edit.getEdit).post(_middlewares.avatarUpload.single("avatar"), _edit.postEdit);
var _default = userRouter;
exports["default"] = _default;