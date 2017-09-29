import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

import baseConfig from './webpack.config.client';
import { regularExpressions } from './webpack.config';

import appConfig from './config';

const config = baseConfig({ development: true, css_bundle: true });

config.devtool = 'inline-source-map';

config.module.rules.push({
    test: regularExpressions.javascript,
    use: [
        {
            loader: 'happypack/loader',
            options: {
                id: 'js'
            }
        },
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    'react',
                    'es2015',
                    'stage-3',
                    'stage-0'
                ],
                plugins: [
                    [
                        'react-transform',
                        {
                            transforms:
                            [
                                {
                                    transform: 'react-transform-catch-errors',
                                    imports: ['react']
                                }
                            ]
                        }
                    ]
                ]
            }
        },
        {
            loader: 'eslint-loader',
            options: {
                configFile: path.resolve(__dirname, '../.eslintrc.json'),
                quiet: true,
                emitError: true,
                failOnError: true
            }
        }
    ],
    exclude: [/node_modules/, /public/]
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
    }) // no need to specify loaders manually, yay!
);

const host = `http://${appConfig.devServer.host}:${appConfig.devServer.port}`;

// enable webpack development server
config.entry.main = [
    // 'react-hot-loader/patch',
    `webpack-dev-server/client?${host}`,
    // 'webpack/hot/only-dev-server',
    config.entry.main
];

const devServerHost = appConfig.devServer.host;
const devServerPort = appConfig.devServer.port;

// network path for static files: fetch all statics from webpack development server
config.output.publicPath = `http://${devServerHost}:${devServerPort}${config.output.publicPath}`;

// Add React Hot Module Replacement plugin to `babel-loader`

const jsLoader = config.module.rules.find(
    loader => loader.test.toString() === regularExpressions.javascript.toString()
);

// jsLoader.use[0].options = {
//     plugins: [
//         [
//             'react-transform',
//             {
//                 transforms:
//                 [
//                     {
//                         transform: 'react-transform-catch-errors',
//                         imports: ['react']
//                     }
//                 ]
//             }
//         ]
//     ]
// };


export default config;
