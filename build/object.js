"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var object = {
  regExp: {
    passRegex: /((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[a-zA-Z])(?=.*[0-9]))/g,
    emailRegex: /(^[0-9a-zA-Z]{0,15}@[0-9a-zA-Z]{0,10}.*)/g
  }
};
var _default = object;
exports["default"] = _default;