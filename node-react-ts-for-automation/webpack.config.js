const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: "/node_modules/",
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST: "127.0.0.1",
            PORT: "8084"
        })
    ]
}