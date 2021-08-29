"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/Video");

require("./models/User");

require("./models/Comment");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.port || process.env.PORT || 4001;

_app["default"].listen(PORT, function () {
  console.log("\u2705Server listening on PORT http://localhost:".concat(PORT));
});