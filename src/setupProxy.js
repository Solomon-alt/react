const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/api',
    
        {
            ws: false,
            target: 'http://localhost:8888/api/private/v1/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
    ))
}