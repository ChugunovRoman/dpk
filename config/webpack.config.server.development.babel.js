import webpack from 'webpack';
import baseConfig from './webpack.config.server';

import appConfig from './config';
// import regularExpressions from './webpack.config';

const config = Object.assign({}, baseConfig);

const devServerHost = appConfig.devServer.host;
const devServerPort = appConfig.devServer.port;
const publicPath = config.output.publicPath;
// Network path for static files: fetch all statics from webpack development server
config.output.publicPath = `http://${devServerHost}:${devServerPort}${publicPath}`;

config.devtool = 'inline-source-map';

config.module.rules.push({
    test: /\.jsx?$/,
    use: [
        {
            loader: 'react-hot-loader' 
        },
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    'react',
                    'es2015',
                    'stage-3',
                    'stage-0'
                ]
            }
        },
        {
            loader: 'eslint-loader'
        }
    ],
    exclude: [/node_modules/, /public/]
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
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['global', 'vendor'],
    //     children: true,
    //     async: true,
    // })
);

export default config;