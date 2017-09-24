import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

// import {regularExpressions} from './webpack.config';
import baseConfig from './webpack.config.client';

const appConfig = require('./config');

const config = baseConfig({ development: true, css_bundle: true });

config.devtool = 'inline-source-map';

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
    'react-hot-loader/patch',
    `webpack-dev-server/client?${host}`,
    'webpack/hot/only-dev-server',
    config.entry.main
];

const devServerHost = appConfig.devServer.host;
const devServerPort = appConfig.devServer.port;

// network path for static files: fetch all statics from webpack development server
config.output.publicPath = `http://${devServerHost}:${devServerPort}${config.output.publicPath}`;

// Add React Hot Module Replacement plugin to `babel-loader`

const jsLoader = config.module.rules.find(
    loader => loader.test.toString() === /\.jsx?$/.toString()
);

jsLoader.use[0].options = {
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
};

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

export default config;
