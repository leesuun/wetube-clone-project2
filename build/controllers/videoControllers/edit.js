"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEdit = exports.getEdit = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getEdit = /*#__PURE__*/function () {
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
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).render(404, {
              errorMessage: "Not Found Video"
            }));

          case 6:
            if (!(String(video.owner) !== String(_id))) {
              _context.next = 9;
              break;
            }

            req.flash("error", "비디오 소유자가 아닙니다.");
            return _context.abrupt("return", res.status(403).redirect("/video/".concat(id)));

          case 9:
            return _context.abrupt("return", res.render("edit-video", {
              video: video,
              pageTitle: "Edit-video"
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEdit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, title, description, genre, hashtag, id, _id, video;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, genre = _req$body.genre, hashtag = _req$body.hashtag, id = req.params.id, _id = req.session.user._id;
            _context2.next = 3;
            return _Video["default"].findById(id);

          case 3:
            video = _context2.sent;

            if (video) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).render(404, {
              errorMessage: "Not Found Video"
            }));

          case 6:
            if (!(String(video.owner) !== String(_id))) {
              _context2.next = 9;
              break;
            }

            console.log("not video owner");
            return _context2.abrupt("return", res.status(403).redirect("/video/".concat(id)));

          case 9:
            _context2.prev = 9;
            _context2.next = 12;
            return _Video["default"].findByIdAndUpdate(id, {
              title: title,
              description: description,
              genre: genre,
              hashtag: _Video["default"].formatHashtag(hashtag)
            });

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](9);
            return _context2.abrupt("return", res.status(400).redirect("edit-video"));

          case 17:
            return _context2.abrupt("return", res.redirect("/video/".concat(id)));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[9, 14]]);
  }));

  return function postEdit(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;