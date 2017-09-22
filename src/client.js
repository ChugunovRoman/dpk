'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from './components/App';

render (
    <Provider store={store}>
        <BrowserRouter history={createHistory()}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
