import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, trim: true, require: true, maxLength: 20 },
    description: { type: String, trim: true, require: true, maxLength: 20 },
    genre: { type: String, trim: true, require: true },
    hashtag: [{ type: String, trim: true }],
    createAt: { type: Date, require: true },
    videoUrl: { type: String, require: true },
    thumbUrl: { type: String },
    meta: {
        rating: { type: Number },
        views: { type: Number, default: 0 },
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Comment" },
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
});

videoSchema.static("formatHashtag", function (hashtag) {
    if (hashtag === "") {
        return "";
    }
    return hashtag
        .split(",")
        .map((hashtag) => (hashtag.startsWith("#") ? hashtag : "#" + hashtag));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
