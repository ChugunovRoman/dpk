import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App';
import HelloWorldPage from './components/HelloWorldPage';
import Reports from './components/Reports';


export default (
    <Switch>
        <Route path='/' component={App} />
        <Route path='/hello' component={HelloWorldPage} />
        <Route path='/reports'component={Reports} />
    </Switch>
);
// export default(
//     <Route component={App} path='/'>
//         <IndexRoute component={HelloWorldPage}/>
//         <Route component={CounterPage} path='counters'/>
//         <Route component={TimePage} path='time'/>
//     </Route>
// );
