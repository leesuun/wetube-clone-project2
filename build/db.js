"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoDB = process.env.DB_URL;

_mongoose["default"].connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var error = function error(_error) {
  console.error.bind(console, "connection error:");
};

var db = _mongoose["default"].connection;
db.on("error", error);
db.once("open", function () {
  console.log("DB on✅");
});