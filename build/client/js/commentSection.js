"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import regeneratorRuntime from "regenerator-runtime";
var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var textarea = form.querySelector("textarea");
var commentList = document.querySelector(".video__comment ul");
var deleteBtn = commentList.querySelectorAll("#delBtn");
var newCommentId;

var addComment = function addComment(text, newCommentId) {
  var comment = document.createElement("li");
  var icon = document.createElement("i");
  var span = document.createElement("span");
  var delBtn = document.createElement("button");
  icon.classList = "fas fa-comment fa-lg";
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.dataset.commentid = newCommentId;
  delBtn.id = "delBtn";
  comment.appendChild(icon);
  comment.appendChild(span);
  comment.appendChild(delBtn);
  commentList.appendChild(comment);
  delBtn.addEventListener("click", handleDelete);
};

var deleteComment = function deleteComment(commentid) {
  for (var i = 0; i < deleteBtn.length; i++) {
    if (deleteBtn[i].dataset.commentid === commentid) {
      deleteBtn[i].parentNode.remove();
    }
  }
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var text, videoId, response, body;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            text = textarea.value;
            videoId = videoContainer.dataset.id;

            if (!(text === "")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return fetch("/api/video/".concat(videoId, "/createComment"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text: text
              })
            });

          case 7:
            response = _context.sent;
            _context.next = 10;
            return response.json();

          case 10:
            body = _context.sent;
            newCommentId = body.newCommentId;

            if (response.status === 201) {
              addComment(text, newCommentId);
            }

            textarea.value = "";

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleDelete = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var videoId, commentid, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            videoId = videoContainer.dataset.id;
            commentid = event.target.dataset.commentid;
            _context2.next = 4;
            return fetch("/api/video/".concat(videoId, "/deleteComment"), {
              method: "delete",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                commentid: commentid
              })
            });

          case 4:
            response = _context2.sent;

            if (response.status === 202) {
              deleteComment(commentid);
              event.target.parentNode.remove();
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDelete(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", handleDelete);
  }
}