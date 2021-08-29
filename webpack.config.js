const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_JS = "./src/client/js/";

module.exports = {
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer: BASE_JS + "videoPlayer.js",
        commentSection: BASE_JS + "commentSection.js",
        recorder: BASE_JS + "recorder.js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
    output: {
        path: path.resolve(__dirname, "assets"),
        filename: "js/[name].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
};
