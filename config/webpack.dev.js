/**
 * Created by icepoint1999 on 7/10/16.
 */
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers/helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('/dev/dist'),
        publicPath: 'http://localhost:9000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        inline: true,
        port: 9000,
        changeOrigin: true,
        historyApiFallback: true,
        proxy: {
            '/oauth/*': {
                target: 'http://localhost:3000',
            },

            '/api/*': {
                target: 'http://localhost:3000',
            },
            '/upload/*': {
                target: 'http://localhost:3000',
            }
        }
    },
});