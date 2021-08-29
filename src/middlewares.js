import multer from "multer";
import cors from "cors";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName = "Wetube";
    console.log(res.locals.loggedInUser);
    // console.log(res.locals.loggedIn);

    next();
};

export const protectMiddleware = (req, res, next) => {
    if (!res.locals.loggedIn) {
        return res.redirect("/");
    } else {
        next();
    }
};

export const publicMiddleware = (req, res, next) => {
    if (res.locals.loggedIn) {
        return res.redirect("/");
    } else {
        next();
    }
};

export const avatarUpload = multer({
    dest: "uploads/images",
    limits: {
        fileSize: 10000000,
    },
});

export const videoUpload = multer({
    dest: "uploads/videos",
    limits: {
        fileSize: 30000000,
    },
});
