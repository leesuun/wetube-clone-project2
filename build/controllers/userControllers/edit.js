"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEdit = exports.getEdit = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getEdit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$session$user, _id, socialOnly, id, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, socialOnly = _req$session$user.socialOnly, id = req.params.id;

            if (!socialOnly) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.redirect("profile"));

          case 3:
            if (!(String(id) !== String(_id))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.redirect("/"));

          case 5:
            _context.next = 7;
            return _User["default"].findById(_id);

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(404).render("404", {
              errorMessage: "Not found User"
            }));

          case 10:
            return _context.abrupt("return", res.render("edit-profile", {
              pageTitle: "Edit-profile"
            }));

          case 11:
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
    var _req$body, username, email, location, _req$session$user2, _id, sessionEmail, sessionUsername, avatarUrl, file, size, findUser, _findUser, updateUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, location = _req$body.location, _req$session$user2 = req.session.user, _id = _req$session$user2._id, sessionEmail = _req$session$user2.email, sessionUsername = _req$session$user2.username, avatarUrl = _req$session$user2.avatarUrl, file = req.file;

            if (!file) {
              _context2.next = 6;
              break;
            }

            size = req.file.size;

            if (!(size > 10000000)) {
              _context2.next = 6;
              break;
            }

            req.flash("error", "파일 용량 초과 에러");
            return _context2.abrupt("return", res.status(400).render("edit-profile", {
              pageTitle: "Edit Profile"
            }));

          case 6:
            if (!(sessionEmail !== email)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 9;
            return _User["default"].findOne({
              email: email
            });

          case 9:
            findUser = _context2.sent;

            if (!(findUser && findUser._id !== _id)) {
              _context2.next = 13;
              break;
            }

            req.flash("error", "이미 존재하는 이메일 입니다.");
            return _context2.abrupt("return", res.status(400).render("edit-profile", {
              pageTitle: "Edit Profile"
            }));

          case 13:
            if (!(sessionUsername !== username)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 16;
            return _User["default"].findOne({
              username: username
            });

          case 16:
            _findUser = _context2.sent;

            if (!(_findUser && _findUser._id !== _id)) {
              _context2.next = 20;
              break;
            }

            req.flash("error", "이미 존재하는 닉네임 입니다.");
            return _context2.abrupt("return", res.status(400).render("edit-profile", {
              pageTitle: "Edit Profile"
            }));

          case 20:
            _context2.next = 22;
            return _User["default"].findByIdAndUpdate(_id, {
              username: username,
              email: email,
              location: location,
              avatarUrl: file ? file.path : avatarUrl
            }, {
              "new": true
            });

          case 22:
            updateUser = _context2.sent;
            req.session.user = updateUser;
            return _context2.abrupt("return", res.redirect("profile"));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postEdit(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;