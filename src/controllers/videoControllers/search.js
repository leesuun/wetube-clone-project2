import Video from "../../models/Video";

export const postSearch = async (req, res) => {
    const { keyword } = req.body;

    let videos = [];

    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i"),
            },
        }).populate("owner");

        return res.render("home", { videos });
    }
};
