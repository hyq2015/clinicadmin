const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = merge(baseWebpackConfig, {
    output: {
        path:path.resolve(__dirname, "../dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].js"
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '..src/assets'),
                to: "assets",
                ignore: ['.*']
            }
        ]),
    ]

});
module.exports = webpackConfig;
