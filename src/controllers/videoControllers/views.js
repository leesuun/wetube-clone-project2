import Video from "../../models/Video";

export const resistorView = async (req, res) => {
    const {
        params: { id },
    } = req;

    const video = await Video.findById(id);

    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views += 1;
    await video.save();
    return res.sendStatus(200);
};
