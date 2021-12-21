const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;
const ENV = process.env.NODE_ENV

module.exports = (env) => {
    console.log(env)
    return {
        entry: "/src/index",
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
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "Restaurant", //domain name
                library: {type: "var", name: "Restaurant"},
                filename: "remoteEntry.js", //bundle
                exposes: { //외부연결

                },
                shared: {
                    ...deps,
                    "react": {singleton: true, strictVersion: true, eager: true},
                    "react-dom": {singleton: true, strictVersion: true, eager: true},
                    "react-router-dom": {singleton: true, strictVersion: true, eager: true}
                },
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            new Dotenv({
                path:`./config/.env.${ENV}`
            })
        ],
    }
};