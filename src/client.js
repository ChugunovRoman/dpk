'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

// require('react-hot-loader/patch');
// require('babel-runtime/core-js/promise').default = require('bluebird');

import App from './components/App';

render (
    <BrowserRouter history={createHistory()}>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);
// render (
//     <AppContainer>
//         <BrowserRouter history={createHistory()}>
//             <App />
//         </BrowserRouter>
//     </AppContainer>,
//     document.getElementById('app')
// );

// module.hot.accept('./components/App', () => {
//     const UpdatedRoot = require('./components/App');

//     render(
//         <AppContainer errorReporter={Redbox}>
//             <UpdatedRoot />
//         </AppContainer>,
//     dest);
// });
