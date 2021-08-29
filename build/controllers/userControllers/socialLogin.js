"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitLoginFinish = exports.gitLoginStart = exports.kakaoLoginFinish = exports.kakaoLoginStart = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _regeneratorRuntime = require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var kakaoLoginStart = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var baseUrl, config, params, finalUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseUrl = "https://kauth.kakao.com/oauth/authorize";
            config = {
              client_id: process.env.KA_CLIENT,
              redirect_uri: "http://localhost:4002/user/kakao/finish",
              response_type: "code",
              prompt: "profile_nickname,profile_image,account_email"
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params);
            return _context.abrupt("return", res.redirect(finalUrl));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function kakaoLoginStart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.kakaoLoginStart = kakaoLoginStart;

var kakaoLoginFinish = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var baseUrl, code, config, params, finalUrl, requestToken, access_token, apiUrl, userdata, _userdata$kakao_accou, email, _userdata$kakao_accou2, nickname, profile_image_url, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseUrl = "https://kauth.kakao.com/oauth/token";
            code = req.query.code;
            config = {
              grant_type: "authorization_code",
              client_id: process.env.KA_CLIENT,
              redirect_uri: "http://localhost:4002/user/kakao/finish",
              code: code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params);
            _context2.next = 7;
            return (0, _nodeFetch["default"])(finalUrl, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 7:
            _context2.next = 9;
            return _context2.sent.json();

          case 9:
            requestToken = _context2.sent;

            if (!("access_token" in requestToken)) {
              _context2.next = 31;
              break;
            }

            access_token = requestToken.access_token;
            apiUrl = "https://kapi.kakao.com/v2/user/me";
            _context2.next = 15;
            return (0, _nodeFetch["default"])(apiUrl, {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });

          case 15:
            _context2.next = 17;
            return _context2.sent.json();

          case 17:
            userdata = _context2.sent;
            _userdata$kakao_accou = userdata.kakao_account, email = _userdata$kakao_accou.email, _userdata$kakao_accou2 = _userdata$kakao_accou.profile, nickname = _userdata$kakao_accou2.nickname, profile_image_url = _userdata$kakao_accou2.profile_image_url;
            _context2.next = 21;
            return _User["default"].findOne({
              email: email
            });

          case 21:
            user = _context2.sent;

            if (user) {
              _context2.next = 26;
              break;
            }

            _context2.next = 25;
            return _User["default"].create({
              username: nickname,
              email: email,
              password: "Don't availablePassword12",
              avatarUrl: profile_image_url,
              socialOnly: true,
              socialType: "Kakao"
            });

          case 25:
            user = _context2.sent;

          case 26:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 31:
            return _context2.abrupt("return", res.redirect("/login"));

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function kakaoLoginFinish(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.kakaoLoginFinish = kakaoLoginFinish;

var gitLoginStart = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var baseUrl, config, params, finalUrl;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseUrl = "https://github.com/login/oauth/authorize";
            config = {
              client_id: process.env.GH_CLIENT,
              allow_signup: false,
              scope: "read:user user:email user:follow"
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params); //github에 요청을 보내면 설정한 callback주소로 redirect 시켜줌("/user/github/finish")

            return _context3.abrupt("return", res.redirect(finalUrl));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function gitLoginStart(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.gitLoginStart = gitLoginStart;

var gitLoginFinish = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var baseUrl, code, config, params, requestToken, access_token, apiUrl, userDate, userEmail, userFollow, followList, i, followObj, emailObj, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            baseUrl = "https://github.com/login/oauth/access_token";
            code = req.query.code;
            config = {
              client_id: process.env.GH_CLIENT,
              client_secret: process.env.GH_SECRET,
              code: code
            };
            params = new URLSearchParams(config).toString();
            _context4.next = 6;
            return (0, _nodeFetch["default"])("".concat(baseUrl, "?").concat(params), {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context4.next = 8;
            return _context4.sent.json();

          case 8:
            requestToken = _context4.sent;

            if (!("access_token" in requestToken)) {
              _context4.next = 42;
              break;
            }

            access_token = requestToken.access_token;
            apiUrl = "https://api.github.com";
            _context4.next = 14;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 14:
            _context4.next = 16;
            return _context4.sent.json();

          case 16:
            userDate = _context4.sent;
            _context4.next = 19;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 19:
            _context4.next = 21;
            return _context4.sent.json();

          case 21:
            userEmail = _context4.sent;
            _context4.next = 24;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/followers"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 24:
            _context4.next = 26;
            return _context4.sent.json();

          case 26:
            userFollow = _context4.sent;
            followList = [];

            for (i = 0; i < userFollow.length; i++) {
              followObj = {
                username: userFollow[i].login,
                avatarUrl: userFollow[i].avatar_url,
                homepageUrl: userFollow[i].html_url
              };
              followList.push(followObj);
            }

            emailObj = userEmail.find(function (email) {
              return email.primary === true && email.verified === true;
            });
            _context4.next = 32;
            return _User["default"].findOne({
              email: emailObj.email
            });

          case 32:
            user = _context4.sent;

            if (user) {
              _context4.next = 37;
              break;
            }

            _context4.next = 36;
            return _User["default"].create({
              username: userDate.name,
              email: emailObj.email,
              password: "Don't availablePassword12",
              location: userDate.location,
              avatarUrl: userDate.avatar_url,
              socialFollowingUser: followList,
              socialOnly: true,
              socialType: "github"
            });

          case 36:
            user = _context4.sent;

          case 37:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context4.abrupt("return", res.redirect("/"));

          case 42:
            return _context4.abrupt("return", res.redirect("/login"));

          case 43:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function gitLoginFinish(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.gitLoginFinish = gitLoginFinish;