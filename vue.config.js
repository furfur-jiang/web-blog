const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
const debug = process.env.NODE_ENV !== 'production'


module.exports = {
    configureWebpack: (config) => {
        if (debug) {
            // 开发环境配置
            config.devtool = 'source-map'
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("base", resolve("baseConfig"))
            .set("public", resolve("public"));
    },
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.100.3:8089/',
                secure: false,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}