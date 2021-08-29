"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteVideo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, _id, video;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id, _id = req.session.user._id;
            _context.next = 3;
            return _Video["default"].findById(id);

          case 3:
            video = _context.sent;

            if (video) {
              _context.next = 7;
              break;
            }

            req.flash("error", "비디오를 찾을 수 없습니다.");
            return _context.abrupt("return", res.status(404).render("404"));

          case 7:
            if (!(String(video.owner) !== String(_id))) {
              _context.next = 10;
              break;
            }

            req.flash("error", "비디오 소유자가 아닙니다.");
            return _context.abrupt("return", res.status(403).redirect("/video/".concat(id)));

          case 10:
            _context.next = 12;
            return _Video["default"].findByIdAndDelete(id);

          case 12:
            return _context.abrupt("return", res.redirect("/"));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteVideo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.deleteVideo = deleteVideo;