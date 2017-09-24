import webpack from 'webpack';
import baseConfig from './webpack.config.server';

import regularExpressions from './webpack.config';

const config = Object.assign({}, baseConfig);

config.module.rules.push({
    test: regularExpressions.javascript,
    use: [
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
        }
    ],
    exclude: [/node_modules/, /public/]
});

config.plugins = config.plugins.concat(
    new CleanWebpackPlugin(['public/assets/'], {
        root: __dirname,
        verbose: true,
        dry: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('production'),
        'process.env.BROWSER': JSON.stringify(0),

        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
);

export default config;