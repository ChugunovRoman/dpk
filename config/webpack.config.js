global.Promise = require('bluebird');

// require('dotenv').config();

import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import appConfig from './config';

// project folder
const rootFolder = path.resolve(__dirname, '..');

// regular expressions for module.loaders
export const regularExpressions = {
    javascript: /\.jsx?$/,
    sass: /\.sass$/,
    css: /\.css$/
};

const assetsPath = path.resolve(rootFolder, 'webroot', 'build', 'client');

const config = {
    context: `${rootFolder}/src`,
    entry: {
        client: path.join(rootFolder, '/src/client.js')
        // main: path.join(__dirname, '../src/client.js')
    },
    output: {
        // filesystem path for static files
        path: path.join(rootFolder, '/public/assets/'),

        // network path for static files
        publicPath: `/public/assets/`,

        // file name pattern for entry scripts
        filename: '[name].[hash].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: regularExpressions.javascript,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
            {
                test: regularExpressions.css,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                // importLoaders: 1,
                                localIdentName: '[local]'
                                // localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
        
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         parser: 'sugarss',
                        //         exec: true,
                        //         importLoaders: 1,
                        //         plugins: {
                        //             'postcss-import': {},
                        //             'postcss-cssnext': {},
                        //             'autoprefixer': {},
                        //             'cssnano': {}
                        //         }
                        //     }
                        // }
                    ]
                })
            },
            {
                test: regularExpressions.sass,
                use: ExtractTextPlugin.extract({
                    // fallback: 'style-loader',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,  
                                sourceMap: true,
                                sourceMapContents: true,
                                importLoaders: 1,
                                localIdentName: '[local]'
                                // localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         parser: 'sugarss',
                        //         exec: true,
                        //         importLoaders: 1,
                        //         plugins: {
                        //             'postcss-import': {},
                        //             'autoprefixer': {},
                        //             'cssnano': {}
                        //         }
                        //     }
                        // },
                        {
                            loader: 'sass-loader'
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
        extensions: ['.js', '.jsx', '.sass', '.css'],

        modules: [
            // path.resolve(__dirname, '..', 'src'),
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

    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         BROWSER: JSON.stringify(true),
        //         NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        //     }
        // }),

        new ExtractTextPlugin('[name].css')
    ]
};

export default config;
