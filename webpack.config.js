var webpack = require('webpack');
module.exports = {
    entry: {
        index:'./public/js/index.js',
    },
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module:{
      //加载器配置
        loaders:[
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },

}