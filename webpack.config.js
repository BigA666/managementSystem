 //用npm run dev代替webpack-dev-server
var webpack = require('webpack')
var path = require('path')
module.exports = {

    entry: { // 入口文件
        bundle: './src/main.js'
    },
    output: { // 出口
        path: __dirname + '/build',
        filename: '[name].js'
    },
    module: { 
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'] //css 是存在缓存  style是生成在页面  先由css处理在由style处理
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'  // npm install vue-template-compiler -D
            },
            {
                test: /\.js$/,  // 处理es6语法的问题   
                use: 'babel-loader' // npm install vue-loader babel-loader babel-core babel-preset-evn -D
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(ttf|woff|svg|eot|otf|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        open: true,
        port: 8888,
        inline: true, // 内联模式  不要ifram
        historyApiFallback: true, // 指定默认打开文件
        noInfo: true, // 不要多余的信息
        hot: true // 只能让css热替换
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', //vue.common.js 是用commonjs规范 esm 使用es6的
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.js', '.vue']  // 省略.js 与.vue后缀
    },
    devtool: 'eval-source-map',  // 控制台的信息
    plugins: [
        new webpack.HotModuleReplacementPlugin()  // 模块热替换
    ]
}