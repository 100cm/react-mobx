var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers/helpers');
var path = require('path')
var React = require('react')
var reactDom = require('react-dom')

module.exports = {
    entry: {
        'app': './src/app.js'
    },

    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
        alias: {
            jquery: path.join(__dirname, "../node_modules/jquery/dist/jquery")
        }
    },

    module: {
        loaders: [

            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1', 'stage-3','stage-0'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties',["import", {
                        "libraryName": "antd",
                        "style": 'css',   // or 'css'
                    }]],
                },
            },

            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            },

        ]
    },


    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        // load once
        new webpack.ProvidePlugin({
            "React": "react", 'reactDom': 'react-dom'
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),


    ]
};
