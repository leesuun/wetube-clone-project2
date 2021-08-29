"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

var _account = require("../controllers/userControllers/account");

var _search = require("../controllers/videoControllers/search");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _videoController.home);
rootRouter.route("/search").post(_search.postSearch);
rootRouter.route("/join").all(_middlewares.publicMiddleware).get(_account.getJoin).post(_account.postJoin);
rootRouter.route("/login").all(_middlewares.publicMiddleware).get(_account.getLogin).post(_account.postLogin);
var _default = rootRouter;
exports["default"] = _default;