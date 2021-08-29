"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _object = _interopRequireDefault(require("../../object"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, passwordConf, location, avatar, usersExists, emailExists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, passwordConf = _req$body.passwordConf, location = _req$body.location, avatar = _req$body.avatar;
            _context.next = 3;
            return _User["default"].exists({
              username: username,
              socialOnly: false
            });

          case 3:
            usersExists = _context.sent;
            _context.next = 6;
            return _User["default"].exists({
              email: email,
              socialOnly: false
            });

          case 6:
            emailExists = _context.sent;

            if (!(!username || !email || !password || !passwordConf)) {
              _context.next = 10;
              break;
            }

            req.flash("error", "정보를 입력해주세요.");
            return _context.abrupt("return", res.status(400).redirect("/join"));

          case 10:
            if (!usersExists) {
              _context.next = 15;
              break;
            }

            req.flash("error", "이미 존재하는 닉네임 입니다.");
            return _context.abrupt("return", res.status(400).render("join"));

          case 15:
            if (!emailExists) {
              _context.next = 20;
              break;
            }

            req.flash("error", "이미 존재하는 이메일 입니다.");
            return _context.abrupt("return", res.status(400).render("join"));

          case 20:
            if (!(password !== passwordConf)) {
              _context.next = 25;
              break;
            }

            req.flash("error", "비밀번호가 일치하지 않습니다.");
            return _context.abrupt("return", res.status(400).render("join"));

          case 25:
            if (password.match(_object["default"].regExp.passRegex)) {
              _context.next = 30;
              break;
            }

            req.flash("error", "영문과 숫자를 혼합한 비밀번호를 입력해주세요.").status(400);
            return _context.abrupt("return", res.status(400).render("join"));

          case 30:
            if (email.match(_object["default"].regExp.emailRegex)) {
              _context.next = 33;
              break;
            }

            req.flash("error", "이메일 형식을 유지해주세요.");
            return _context.abrupt("return", res.status(400).render("join"));

          case 33:
            _context.prev = 33;
            _context.next = 36;
            return _User["default"].create({
              username: username,
              email: email,
              password: password,
              location: location,
              socialOnly: false
            });

          case 36:
            _context.next = 42;
            break;

          case 38:
            _context.prev = 38;
            _context.t0 = _context["catch"](33);
            console.log("error: ", _context.t0);
            return _context.abrupt("return", res.render("join"));

          case 42:
            return _context.abrupt("return", res.redirect("login"));

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[33, 38]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "LogIn"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, password, user, ok;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            _context2.next = 3;
            return _User["default"].findOne({
              username: username
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            req.flash("error", "아이디, 비밀번호를 확인해주세요.");
            return _context2.abrupt("return", res.redirect("login"));

          case 7:
            if (!(!username || !password)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).redirect("/login"));

          case 9:
            _context2.next = 11;
            return _bcrypt["default"].compare(password, user.password);

          case 11:
            ok = _context2.sent;

            if (ok) {
              _context2.next = 15;
              break;
            }

            req.flash("error", "아이디, 비밀번호를 확인해주세요.");
            return _context2.abrupt("return", res.status(400).render("login"));

          case 15:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.loggedIn = false;
  req.session.user = null;
  req.flash("success", "Bye Bye~");
  return res.redirect("/");
};

exports.logout = logout;