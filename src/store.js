import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const history = createHistory();
const middlewareHistory = routerMiddleware(history);

const store = createStore(
    combineReducers({
        reducer,
        router: routerReducer
    }),
    applyMiddleware(
        middlewareHistory,
        thunk
    )
);

export default store;