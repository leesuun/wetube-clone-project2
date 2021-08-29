"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/Video");

require("./models/User");

require("./models/Comment");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log("sad");
var PORT = 4002 || process.env.DB_URL;

_app["default"].listen(PORT, function () {
  console.log("\u2705Server listening on PORT http://localhost:".concat(PORT, " \uD83D\uDE80"));
});