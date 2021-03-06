const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3001,
    },
    output: {
        publicPath: "http://localhost:3001/", //
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "Restaurant", //domain name
            library: { type: "var", name: "Restaurant" },
            filename: "remoteEntry.js", //bundle
            exposes: { //외부연결
                "./Restaurant": "./src/Restaurant/index",
                "./List": "./src/Restaurant/List/view/ListContainer", //index name
                "./Detail": "./src/Restaurant/Detail/view/DetailContainer",//
                './Sample' : "./src/Restaurant/Detail/store/DetailKeeper",
                './Sample1' : "./src/Restaurant/Detail/store/Sample"
            },
            shared: {
                ...deps,
                "react": { singleton: true ,strictVersion:true,eager:true},
                "react-dom": { singleton: true ,strictVersion:true,eager:true},
                "react-router-dom": { singleton: true ,strictVersion:true,eager:true }
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};