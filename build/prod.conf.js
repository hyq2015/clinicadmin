const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = merge(baseWebpackConfig, {
    output: {
        path:path.resolve(__dirname, "../dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].js"
    },
    plugins: [
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../src/assets/images'),
        //         to: "assets/images",
        //         ignore: ['.*']
        //     }
        // ]),
    ]

});
module.exports = webpackConfig;
