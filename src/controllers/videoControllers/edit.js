import Video from "../../models/Video";

export const getEdit = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;
    const video = await Video.findById(id);

    if (!video) {
        return res.status(404).render(404, { errorMessage: "Not Found Video" });
    }

    if (String(video.owner) !== String(_id)) {
        req.flash("error", "비디오 소유자가 아닙니다.");
        return res.status(403).redirect(`/video/${id}`);
    }

    return res.render("edit-video", { video, pageTitle: "Edit-video" });
};

export const postEdit = async (req, res) => {
    const {
        body: { title, description, genre, hashtag },
        params: { id },
        session: {
            user: { _id },
        },
    } = req;

    const video = await Video.findById(id);

    if (!video) {
        return res.status(404).render(404, { errorMessage: "Not Found Video" });
    }

    if (String(video.owner) !== String(_id)) {
        
        return res.status(403).redirect(`/video/${id}`);
    }
    try {
        await Video.findByIdAndUpdate(id, {
            title,
            description,
            genre,
            hashtag: Video.formatHashtag(hashtag),
        });
    } catch (error) {
        return res.status(400).redirect("edit-video");
    }

    

    return res.redirect(`/video/${id}`);
};
