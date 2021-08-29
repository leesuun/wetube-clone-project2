import Video from "../../models/Video";
import User from "../../models/User";

export const getUpload = (req, res) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    return res.render("upload", { pageTitle: "video-upload" });
};

export const postUpload = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { title, description, genre, hashtag },
        files: { videoFile, thumbFile },
    } = req;
    const isHeroku = process.env.NODE_ENV === "production";

    if (videoFile[0].size > 30000000) {
        req.flash("error", "파일 용량 초과 에러 ");
        return res.status(400).redirect("/upload");
    }

    if (!title || !description) {
        req.flash("error", "Title, Description 미입력");
        return res.status(400).redirect("/upload");
    }

    const video = await Video.create({
        title,
        description,
        genre,
        videoUrl: isHeroku ? video[0].location : video[0].path,
        thumbUrl: isHeroku ? thumb[0].location : video[0].path,
        hashtag: Video.formatHashtag(hashtag),
        owner: _id,
        createAt: new Date(),
    });

    const videoOwner = await User.findById(_id);
    videoOwner.videos.push(video._id);
    await videoOwner.save();

    return res.redirect("/");
};
