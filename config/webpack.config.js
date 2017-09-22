global.Promise = require('bluebird');

require('dotenv').config();

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// const clientConfig = require('./webpack.config.client.babel');
// const serverConfig = require('./webpack.config.server.babel');

// project folder
const rootFolder = path.resolve(__dirname, '..');

// regular expressions for module.loaders
export const regularExpressions = {
    javascript: /\.jsx?$/,
    stylus: /\.styl$/,
    css: /\.css$/,
    sass: /\.sass$/
};

var publicPath = 'http://localhost:8050/public/assets';

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

const assetsPath = path.resolve(rootFolder, 'webroot', 'build', 'client');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: path.join(__dirname, 'src/client.js')
    },
    output: {
        // filesystem path for static files
        path: path.join(__dirname, 'public/assets/'),

        // network path for static files
        publicPath,

        // file name pattern for entry scripts
        filename: '[name].[hash].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].[hash].js'
    },

    module: {
        loaders: [
            {
                test: regularExpressions.css,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }

                        }
                    ]
                })
            },
            {
                test: regularExpressions.sass,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                modules: true,  
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }),
            },
            {
                test: /\.gif$/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg$/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
            },
            {
                test: /\.(woff|woff2|ttf|eot)/,
                loader: 'url-loader?limit=1'
            },
            {
                test: regularExpressions.javascript,
                loader: process.env.NODE_ENV !== 'production'
                    ? 'react-hot-loader!babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-3!eslint-loader'
                    : 'babel-loader',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    'img-loader',
                    'file-loader'
                ]
            },
            {
                test: /\.(mo|po)$/,
                loader: 'binary-loader'
            },
        ]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'src'),
            path.resolve('node_modules')
        ],
        alias: {
            components: path.resolve(__dirname, '../src/components'),
            // containers: path.resolve(__dirname, '../src/containers'),
            // config: path.resolve(__dirname, '../src/config'),
            // utils: path.resolve(__dirname, '../src/utils'),
            // theme: path.resolve(__dirname, '../src/theme'),
            // store: path.resolve(__dirname, '../src/store'),
            // core: path.resolve(__dirname, '../src/core'),
            // meta: path.resolve(__dirname, '../src/meta'),
            // localization: path.resolve(__dirname, '../src/localization')
        }
    },
};

// module.exports = [
//     clientConfig,
//     serverConfig
// ];
