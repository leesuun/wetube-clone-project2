import mongoose, { Schema } from "mongoose";
import object from "../object";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        minLength: 6,
        // validate: object.regExp.emailRegex,
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLength: 6,
        // validate: object.regExp.passRegex,
    },
    location: { type: String, trim: true },
    avatarUrl: { type: String },
    socialOnly: { type: Boolean },
    socialType: { type: String },
    socialFollowingUser: [
        {
            username: { type: String },
            avatarUrl: { type: String },
            homepageUrl: { type: String },
        },
    ],
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
    ],
    comments: [
        { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Comment" },
    ],
});

userSchema.pre("save", async function (next) {
    const randomNumber = Math.floor(Math.random() * 10);
    //password가 수정됬을 때만 실행함(create or modified)
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, randomNumber);
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
