'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
// import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

require('babel-runtime/core-js/promise').default = require('bluebird');
// require('react-hot-loader/patch');
// require('babel-runtime/core-js/promise').default = require('bluebird');

import App from './components/App';

render (
    <Router history={createHistory()}>
        <App />
    </Router>,
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
