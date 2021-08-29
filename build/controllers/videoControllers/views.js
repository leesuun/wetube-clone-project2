"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resistorView = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resistorView = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _Video["default"].findById(id);

          case 3:
            video = _context.sent;

            if (video) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.sendStatus(404));

          case 6:
            video.meta.views += 1;
            _context.next = 9;
            return video.save();

          case 9:
            return _context.abrupt("return", res.sendStatus(200));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resistorView(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.resistorView = resistorView;