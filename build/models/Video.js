"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    trim: true,
    require: true,
    maxLength: 20
  },
  description: {
    type: String,
    trim: true,
    require: true,
    maxLength: 20
  },
  genre: {
    type: String,
    trim: true,
    require: true
  },
  hashtag: [{
    type: String,
    trim: true
  }],
  createAt: {
    type: Date,
    require: true
  },
  videoUrl: {
    type: String,
    require: true
  },
  thumbUrl: {
    type: String
  },
  meta: {
    rating: {
      type: Number
    },
    views: {
      type: Number,
      "default": 0
    }
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    require: true,
    ref: "Comment"
  }],
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    require: true,
    ref: "User"
  }
});
videoSchema["static"]("formatHashtag", function (hashtag) {
  if (hashtag === "") {
    return "";
  }

  return hashtag.split(",").map(function (hashtag) {
    return hashtag.startsWith("#") ? hashtag : "#" + hashtag;
  });
});

var Video = _mongoose["default"].model("Video", videoSchema);

var _default = Video;
exports["default"] = _default;