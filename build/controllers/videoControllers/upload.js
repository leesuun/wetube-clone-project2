"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUpload = exports.getUpload = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUpload = function getUpload(req, res) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  return res.render("upload", {
    pageTitle: "video-upload"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _id, _req$body, title, description, genre, hashtag, _req$files, videoFile, thumbFile, video, videoOwner;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = req.session.user._id, _req$body = req.body, title = _req$body.title, description = _req$body.description, genre = _req$body.genre, hashtag = _req$body.hashtag, _req$files = req.files, videoFile = _req$files.videoFile, thumbFile = _req$files.thumbFile;

            if (!(videoFile[0].size > 30000000)) {
              _context.next = 4;
              break;
            }

            req.flash("error", "파일 용량 초과 에러 ");
            return _context.abrupt("return", res.status(400).redirect("/upload"));

          case 4:
            if (!(!title || !description)) {
              _context.next = 7;
              break;
            }

            req.flash("error", "Title, Description 미입력");
            return _context.abrupt("return", res.status(400).redirect("/upload"));

          case 7:
            _context.next = 9;
            return _Video["default"].create({
              title: title,
              description: description,
              genre: genre,
              videoUrl: videoFile[0].path,
              thumbUrl: thumbFile ? thumbFile[0].path : "",
              hashtag: _Video["default"].formatHashtag(hashtag),
              owner: _id,
              createAt: new Date()
            });

          case 9:
            video = _context.sent;
            _context.next = 12;
            return _User["default"].findById(_id);

          case 12:
            videoOwner = _context.sent;
            videoOwner.videos.push(video._id);
            _context.next = 16;
            return videoOwner.save();

          case 16:
            return _context.abrupt("return", res.redirect("/"));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postUpload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;