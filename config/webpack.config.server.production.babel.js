import webpack from 'webpack';
import baseConfig from './webpack.config.server';

const config = Object.assign({}, baseConfig);

config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('production'),

        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
);

export default config;