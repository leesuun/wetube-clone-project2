import mongoose from "mongoose";

const mongoDB = process.env.DB_URL;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const error = (error) => {
    console.error.bind(console, "connection error:");
};

const db = mongoose.connection;

db.on("error", error);
db.once("open", function () {
    console.log("DB on✅");
});
