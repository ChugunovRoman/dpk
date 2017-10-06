import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

import baseConfig from './webpack.config.client';
import { regularExpressions } from './webpack.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import appConfig from './config';

const config = baseConfig({ development: true, css_bundle: true });

config.devtool = 'inline-source-map';

const jsLoader = config.module.rules.find(loader => loader.test.toString() === regularExpressions.javascript.toString());

// config.module.rules.push(
//     {
//         test: regularExpressions.css,
//         use: ExtractTextPlugin.extract({
//             fallback: 'style-loader',
//             // fallback: 'style-loader',
//             use: [
//                 {
//                     loader: 'css-loader',
//                     options: {
//                         modules: true,
//                         sourceMap: true,
//                         // importLoaders: 1,
//                         localIdentName: '[local]'
//                         // localIdentName: '[name]__[local]___[hash:base64:5]'
//                     }

//                 }
//                 // {
//                 //     loader: 'postcss-loader',
//                 //     options: {
//                 //         parser: 'sugarss',
//                 //         exec: true,
//                 //         config: {
//                 //             ctx: {
//                 //                 autoprefixer: true
//                 //             }
//                 //         }
//                 //     }
//                 // }
//             ]
//         })
//     },
//     {
//         test: regularExpressions.sass,
//         use: ExtractTextPlugin.extract({
//             // fallback: 'style-loader',
//             fallback: 'style-loader',
//             use: [
//                 {
//                     loader: 'css-loader',
//                     options: {
//                         minimize: true,
//                         modules: true,  
//                         sourceMap: true,
//                         sourceMapContents: true,
//                         importLoaders: 1,
//                         localIdentName: '[local]'
//                         // localIdentName: '[name]__[local]___[hash:base64:5]'
//                     }
//                 },
//                 // {
//                 //     loader: 'postcss-loader',
//                 //     options: {
//                 //         parser: 'sugarss',
//                 //         exec: true,
//                 //         importLoaders: 1,
//                 //         config: {
//                 //             ctx: {
//                 //                 autoprefixer: true
//                 //             }
//                 //         }
//                 //     }
//                 // },
//                 {
//                     loader: 'sass-loader'
//                 }
//             ]
//         }),
//     },
// );

jsLoader.use[0].options = {
    presets: [
        'react',
        'es2015',
        'stage-3',
        'stage-0'
    ],
    // plugins: [
    //     [
    //         'react-transform',
    //         {
    //             transforms:
    //             [
    //                 {
    //                     transform: 'react-transform-catch-errors',
    //                     imports: ['react']
    //                 }
    //             ]
    //         }
    //     ]
    // ]
}

jsLoader.use.push({
    loader: 'eslint-loader',
    options: {
        configFile: path.resolve(__dirname, '../.eslintrc.json'),
        quiet: true,
        emitError: true,
        failOnError: true
    }
});

jsLoader.use.unshift({
    loader: 'happypack/loader',
    options: {
        id: 'js'
    }
});


config.plugins.push(
    // environment variables
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.BABEL_ENV': JSON.stringify('es6'),
        'process.env.BROWSER': JSON.stringify(1),

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HappyPack({
        id: 'js',
        loaders: ['babel-loader'],
        threads: 8
    })
);

const host = `http://${appConfig.devServer.host}:${appConfig.devServer.port}`;

// enable webpack development server
// config.entry.client = [
//     // 'react-hot-loader/patch',
//     `webpack-dev-server/client?${host}`,
//     // 'webpack/hot/only-dev-server',
//     config.entry.client
// ];

const devServerHost = appConfig.devServer.host;
const devServerPort = appConfig.devServer.port;

// network path for static files: fetch all statics from webpack development server
config.output.publicPath = `http://${devServerHost}:${devServerPort}${config.output.publicPath}`;

export default config;
