import User from "../../models/User";

export const profile = async (req, res) => {
    const {
        params: { id },
    } = req;

    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
            path: "owner",
            model: "User",
        },
    });
    if (!user) {
        return res.status(404).render("404", { pageTitle: "User not found." });
    }

    return res.render("profile", { user, pageTitle: "Profile" });
};
