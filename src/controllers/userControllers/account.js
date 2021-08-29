import User from "../../models/User";
import object from "../../object";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
    const { username, email, password, passwordConf, location, avatar } =
        req.body;
    const usersExists = await User.exists({ username, socialOnly: false });
    const emailExists = await User.exists({ email, socialOnly: false });

    if (!username || !email || !password || !passwordConf) {
        req.flash("error", "정보를 입력해주세요.");
        return res.status(400).redirect("/join");
    }

    if (usersExists) {
        req.flash("error", "이미 존재하는 닉네임 입니다.");
        return res.status(400).render("join");
    } else if (emailExists) {
        req.flash("error", "이미 존재하는 이메일 입니다.");
        return res.status(400).render("join");
    } else if (password !== passwordConf) {
        req.flash("error", "비밀번호가 일치하지 않습니다.");
        return res.status(400).render("join");
    } else if (!password.match(object.regExp.passRegex)) {
        req.flash(
            "error",
            "영문과 숫자를 혼합한 비밀번호를 입력해주세요."
        ).status(400);
        return res.status(400).render("join");
    } else if (!email.match(object.regExp.emailRegex)) {
        req.flash("error", "이메일 형식을 유지해주세요.");
        return res.status(400).render("join");
    }

    try {
        await User.create({
            username,
            email,
            password,
            location,
            socialOnly: false,
        });
    } catch (error) {
        console.log("error: ", error);
        return res.render("join");
    }
    return res.redirect("login");
};

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "LogIn" });
};
export const postLogin = async (req, res) => {
    const {
        body: { username, password },
    } = req;

    const user = await User.findOne({ username });

    if (!user) {
        req.flash("error", "아이디, 비밀번호를 확인해주세요.");
        return res.redirect("login");
    }

    if (!username || !password) {
        return res.status(400).redirect("/login");
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        req.flash("error", "아이디, 비밀번호를 확인해주세요.");
        return res.status(400).render("login");
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    req.flash("success", "Bye Bye~");
    return res.redirect("/");
};
