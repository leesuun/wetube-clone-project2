"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _cors = _interopRequireDefault(require("cors"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// modules
// Routers
// Middelware
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true },
  store: _connectMongo["default"].create({
    mongoUrl: "mongodb://127.0.0.1:27017/wetube-clone"
  })
}));
app.use(function (req, res, next) {
  req.sessionStore.all(function (error, sessions) {
    // console.log(sessions);
    // console.log("????");
    next();
  });
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://k.kakaocdn.net/");
  next();
});
var corsOptions = {
  origin: "http://k.kakaocdn.net/",
  credentials: true
};
app.use((0, _cors["default"])(corsOptions));
app.use((0, _expressFlash["default"])());
app.use(_express["default"].json());
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/assets", _express["default"]["static"]("assets"));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(logger);
app.use(_middlewares.localsMiddleware);
app.use("/", _rootRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/video", _videoRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;