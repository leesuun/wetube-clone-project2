"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _views = require("../controllers/videoControllers/views");

var _comment = require("../controllers/videoControllers/comment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post("/video/:id([a-z0-9]{24})/view", _views.resistorView);
apiRouter.post("/video/:id([a-z0-9]{24})/createComment", _comment.createComment);
apiRouter["delete"]("/video/:id([a-z0-9]{24})/deleteComment", _comment.deleteComment);
var _default = apiRouter;
/*
비동기 통신 (views)

1. 나의 서버에 브라우저와 통신할 api fetch 라우터를 생성한다.
2. post or get 요청을 처리할 controller를 만든다.
3. 처리할 내용을 작성한다.
3. 템플릿 엔진에 videoid를 입력해서 브라우저에서 사용 할 수 있도록 만든다.
4. video ended 이벤트가 발생하면 나의 서버에 fetch 요청을 보낸다.

*/

exports["default"] = _default;