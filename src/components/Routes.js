import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Reports from './Reports';
import HelloWorldPage from './HelloWorldPage';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={HelloWorldPage} />
            <Route path='/reports'component={Reports} />
        </Switch>
    );
};

export default Main;
