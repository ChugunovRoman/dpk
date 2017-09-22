import { client } from 'universal-webpack/config';
import settings from './universal-webpack-settings';
import config from './webpack.config';

export default client(config, settings);

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = 'http://localhost:8050/public/assets';
var cssName = process.env.NODE_ENV === 'production'
    ? 'styles-[hash].css'
    : 'styles.css';
var jsName = process.env.NODE_ENV === 'production'
    ? 'bundle-[hash].js'
    : 'bundle.js';

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new CleanWebpackPlugin(['public/assets/'], {
        root: __dirname,
        verbose: true,
        dry: false
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }));
}

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: path.join(__dirname, 'src/client.js'),
    output: {
        path: path.join(__dirname, 'public/assets/'),
        filename: jsName,
        publicPath
    },
    plugins,
    module: {
        loaders: [
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",

                        }
                    ]
                })
            }, {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: "sass-loader"
                        }
                    ]
                }),
            }, {
                test: /\.gif$/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            }, {
                test: /\.jpg$/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            }, {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            }, {
                test: /\.svg/,
                loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
            }, {
                test: /\.(woff|woff2|ttf|eot)/,
                loader: 'url-loader?limit=1'
            }, {
                test: /\.jsx?$/,
                loader: process.env.NODE_ENV !== 'production'
                    ? 'react-hot-loader!babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-3!eslint-loader'
                    : 'babel-loader',
                exclude: [/node_modules/, /public/]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    devtool: process.env.NODE_ENV !== 'production'
        ? 'source-map'
        : false,
    devServer: {
        hot: true,
        inline: true,
        host: '127.0.0.1',
        // host: '0.0.0.0',
        // host: '192.168.2.220',
        port: 8050,
        historyApiFallback: true,
        compress: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};
