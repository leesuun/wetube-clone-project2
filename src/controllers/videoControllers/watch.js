import Video from "../../models/Video";

export const watch = async (req, res) => {
    const {
        params: { id },
    } = req;
    const video = await Video.findById(id)
        .populate("owner")
        .populate("comments");

    if (!video) {
        return res
            .status(404)
            .render("404", { errorMessage: "Not found Video" });
    }

    return res.render("watch", { video, pageTitle: "Watch" });
};
