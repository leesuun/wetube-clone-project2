import Video from "../../models/Video";

export const deleteVideo = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;

    const video = await Video.findById(id);

    if (!video) {
        req.flash("error", "비디오를 찾을 수 없습니다.");
        return res.status(404).render("404");
    }

    if (String(video.owner) !== String(_id)) {
        req.flash("error", "비디오 소유자가 아닙니다.");
        return res.status(403).redirect(`/video/${id}`);
    }

    await Video.findByIdAndDelete(id);

    return res.redirect("/");
};
