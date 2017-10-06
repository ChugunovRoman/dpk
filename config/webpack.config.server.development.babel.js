import webpack from 'webpack';
import baseConfig from './webpack.config.server';

import appConfig from './config';
import { regularExpressions } from './webpack.config';

const config = Object.assign({}, baseConfig);

const devServerHost = appConfig.devServer.host;
const devServerPort = appConfig.devServer.port;
const publicPath = config.output.publicPath;
// Network path for static files: fetch all statics from webpack development server
config.output.publicPath = `http://${devServerHost}:${devServerPort}${publicPath}`;

config.devtool = 'inline-source-map';

// config.module.rules.push(
//     {
//         test: regularExpressions.css,
//         use: 'null-loader'
//     },
//     {
//         test: regularExpressions.sass,
//         use: 'null-loader'
//     },
// );

const jsLoader = config.module.rules.find(loader => loader.test.toString() === regularExpressions.javascript.toString());

jsLoader.use.push({
    loader: 'eslint-loader',
});

jsLoader.use.unshift({
    loader: 'react-hot-loader',
});

config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('es6'),
        'process.env.BROWSER': JSON.stringify(0),

        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: false
    })
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),

    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'common'
    // }),

    // new webpack.optimize.OccurrenceOrderPlugin()
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['global', 'vendor'],
    //     children: true,
    //     async: true,
    // })
);

export default config;