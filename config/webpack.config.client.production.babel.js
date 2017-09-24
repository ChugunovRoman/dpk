import path from 'path';
import webpack from 'webpack';
import WebpackCleanPlugin from 'clean-webpack-plugin';

import baseConfig from './webpack.config.client';

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const config = baseConfig({development: false});

config.devtool = 'source-map';

config.plugins = config.plugins.concat(
    // clears the output folder
    new WebpackCleanPlugin(
        [
            path.relative(config.context, config.output.path)
        ],
        {root: config.context}
    ),

    new CleanWebpackPlugin(['public/assets/'], {
        root: __dirname,
        verbose: true,
        dry: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    // environment variables
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('production'),
        'process.env.BROWSER': JSON.stringify(1),

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

export default config;