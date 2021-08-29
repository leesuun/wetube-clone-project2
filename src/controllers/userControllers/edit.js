import User from "../../models/User";

export const getEdit = async (req, res) => {
    const {
        session: {
            user: { _id, socialOnly },
        },
        params: { id },
    } = req;

    if (socialOnly) {
        return res.redirect("profile");
    }

    if (String(id) !== String(_id)) {
        return res.redirect("/");
    }

    const user = await User.findById(_id);
    if (!user) {
        return res
            .status(404)
            .render("404", { errorMessage: "Not found User" });
    }
    return res.render("edit-profile", { pageTitle: "Edit-profile" });
};

export const postEdit = async (req, res) => {
    const {
        body: { username, email, location },
        session: {
            user: {
                _id,
                email: sessionEmail,
                username: sessionUsername,
                avatarUrl,
            },
        },
        file,
    } = req;

    if (file) {
        const {
            file: { size },
        } = req;
        if (size > 10000000) {
            req.flash("error", "파일 용량 초과 에러");
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
            });
        }
    }

    if (sessionEmail !== email) {
        const findUser = await User.findOne({ email });
        if (findUser && findUser._id !== _id) {
            req.flash("error", "이미 존재하는 이메일 입니다.");
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
            });
        }
    }
    if (sessionUsername !== username) {
        const findUser = await User.findOne({ username });
        if (findUser && findUser._id !== _id) {
            req.flash("error", "이미 존재하는 닉네임 입니다.");
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
            });
        }
    }

    const updateUser = await User.findByIdAndUpdate(
        _id,
        {
            username,
            email,
            location,
            avatarUrl: file ? file.location : avatarUrl,
        },
        { new: true }
    );

    req.session.user = updateUser;

    return res.redirect("profile");
};
