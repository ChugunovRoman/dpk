'use strict';

import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import thunk from 'redux-thunk';

import db from './taskLists';

let reducers = combineReducers({
    db
});

export default reducers;
