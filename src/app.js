// modules

import express, { urlencoded } from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import cors from "cors";

// Routers
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";

// Middelware
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://k.kakaocdn.net/");
    next();
});

const corsOptions = {
    origin: "http://k.kakaocdn.net/",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/api", apiRouter);

export default app;
