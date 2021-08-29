"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSearch = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postSearch = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var keyword, videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            keyword = req.body.keyword;
            videos = [];

            if (!keyword) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return _Video["default"].find({
              title: {
                $regex: new RegExp("".concat(keyword), "i")
              }
            }).populate("owner");

          case 5:
            videos = _context.sent;
            return _context.abrupt("return", res.render("home", {
              videos: videos
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postSearch(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postSearch = postSearch;