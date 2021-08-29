import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({}).populate("owner");

    return res.render("home", { videos, pageTitle: "Home" });
};
