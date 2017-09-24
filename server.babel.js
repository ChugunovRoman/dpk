'use strict';

import 'babel-core';
require('babel-register')({
    ignore: /\.sass/
});
// require('babel-register')({
//     'plugins': [
//         [
//             'babel-plugin-transform-require-ignore',
//             {
//                 extensions: [ '.sass', 'css' ]
//             }
//         ]
//     ]
// });

// import register from 'ignore-styles';

// register(['css', 'sass']);
// ['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});

import 'babel-polyfill';
import './src/server';
