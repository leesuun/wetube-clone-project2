import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, require: true },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Video",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
    createAt: { type: Date, require: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
