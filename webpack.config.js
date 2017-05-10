const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/main.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader' },
                    { loader: "sass-loader" }
                ]

            },
            {
                test: /\.svg$/,
                use: ['svg-url-loader']
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'src/js/'),
            assets: path.resolve(__dirname, 'src/assets/')
        },
        extensions: ['.css', '.js', '.jsx']
    },
    output: {
        path: __dirname + "/src/",
        filename: "main.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        //public: 'ec2-35-176-15-190.eu-west-2.compute.amazonaws.com'
    }
};
