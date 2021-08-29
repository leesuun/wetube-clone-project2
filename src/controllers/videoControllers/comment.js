import Video from "../../models/Video";
import Comment from "../../models/Comment";

export const createComment = async (req, res) => {
    const {
        body: { text },
        params: { id },
        session: {
            user: { _id },
        },
    } = req;

    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }

    const comment = await Comment.create({
        text,
        owner: _id,
        video: video._id,
    });

    video.comments.push(comment);
    await video.save();

    return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
        body: { commentid },
    } = req;

    const video = await Video.findById(id).populate("comments");
    if (!video) {
        console.log("video not found");
        return res.sendStatus(404);
    }
    const comment = await Comment.findById(commentid);
    if (String(comment.owner) !== String(_id)) {
        console.log("not comment owner");
        return res.sendStatus(403);
    }

    await Comment.findByIdAndDelete(commentid, {
        comment,
    });

    return res.sendStatus(202);
};
