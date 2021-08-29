"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteComment = exports.createComment = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

var _Comment = _interopRequireDefault(require("../../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var text, id, _id, video, comment;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = req.body.text, id = req.params.id, _id = req.session.user._id;
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
            _context.next = 8;
            return _Comment["default"].create({
              text: text,
              owner: _id,
              video: video._id
            });

          case 8:
            comment = _context.sent;
            video.comments.push(comment);
            _context.next = 12;
            return video.save();

          case 12:
            return _context.abrupt("return", res.status(201).json({
              newCommentId: comment._id
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createComment = createComment;

var deleteComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, _id, commentid, video, comment;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id, _id = req.session.user._id, commentid = req.body.commentid;
            _context2.next = 3;
            return _Video["default"].findById(id).populate("comments");

          case 3:
            video = _context2.sent;

            if (video) {
              _context2.next = 7;
              break;
            }

            console.log("video not found");
            return _context2.abrupt("return", res.sendStatus(404));

          case 7:
            _context2.next = 9;
            return _Comment["default"].findById(commentid);

          case 9:
            comment = _context2.sent;

            if (!(String(comment.owner) !== String(_id))) {
              _context2.next = 13;
              break;
            }

            console.log("not comment owner");
            return _context2.abrupt("return", res.sendStatus(403));

          case 13:
            _context2.next = 15;
            return _Comment["default"].findByIdAndDelete(commentid, {
              comment: comment
            });

          case 15:
            return _context2.abrupt("return", res.sendStatus(202));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteComment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;