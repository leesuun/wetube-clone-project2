"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.avatarUpload = exports.publicMiddleware = exports.protectMiddleware = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "Wetube";
  console.log(res.locals.loggedInUser); // console.log(res.locals.loggedIn);

  next();
};

exports.localsMiddleware = localsMiddleware;

var protectMiddleware = function protectMiddleware(req, res, next) {
  if (!res.locals.loggedIn) {
    return res.redirect("/");
  } else {
    next();
  }
};

exports.protectMiddleware = protectMiddleware;

var publicMiddleware = function publicMiddleware(req, res, next) {
  if (res.locals.loggedIn) {
    return res.redirect("/");
  } else {
    next();
  }
};

exports.publicMiddleware = publicMiddleware;
var avatarUpload = (0, _multer["default"])({
  dest: "uploads/images",
  limits: {
    fileSize: 10000000
  }
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: "uploads/videos",
  limits: {
    fileSize: 30000000
  }
});
exports.videoUpload = videoUpload;