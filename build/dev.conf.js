const baseConfig = require("./base.conf"),
    webpack = require("webpack"),
    merge = require("webpack-merge"),
    devConfig = merge(baseConfig, {
        entry: [
            "eventsource-polyfill",
            "webpack-hot-middleware/client"
        ],
        devtool: "source-map",
        mode: "development",
        plugins:[new webpack.HotModuleReplacementPlugin()]
    }),
    proxyConfig = {
        "/" : {
            target: 'http://clinic.designchn.com/', // target host
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            pathRewrite: {
                '^/': '/', // rewrite path
            },
            // router: {
            //     // when request.headers.host == 'dev.localhost:3000',
            //     // override target 'http://www.example.org' to 'http://localhost:8000'
            //     'dev.localhost:3000': 'http://localhost:8000'
            // }
        }
    };
module.exports = {
    proxyConfig: proxyConfig,
    devConfig: devConfig
};


