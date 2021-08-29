import multer from "multer";
import cors from "cors";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const multerUploader = multerS3({
    s3: s3,
    bucket: "wetubun",
    acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName = "Wetube";

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
    storage: multerUploader,
});

export const videoUpload = multer({
    dest: "uploads/videos",
    limits: {
        fileSize: 30000000,
    },
    storage: multerUploader,
});
