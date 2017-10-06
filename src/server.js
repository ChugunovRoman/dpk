'use strict';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
// import { StaticRouter, RouterContext } from 'react-router'
// import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
// import createHistory from 'react-router/lib/createMemoryHistory';

import http from 'http';
import path from 'path';

import appConfig from '../config/config';
import Html from './html';
import App from './components/App';

export default function (parameters) {
    const app = express();

    app.use('/', express.static(path.join(__dirname, 'public/assets/')));

    const server = new http.Server(app);
    const chunks = parameters.chunks();

    app.use((req, res) => {
        const context = {};
        // const history = createHistory(req.originalUrl);
        // const hydrateOnClient = () => {
        //     res.send(
        //         `<!doctype html>\n${renderToString(<Html assets={chunks} />)}`
        //     );
        // };

        global._env = {};

        // if (configuration.disable_ssr) {
        //     hydrateOnClient();
        //     return;
        // }
        const component = (
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        );

        // console.log('chunks: ', chunks);

        const html = renderToString(
            <Html
                assets={chunks}
                component={component}
                store={0}
                context={context}
            />
        );

        if (context.url) {
            console.log('context: ', context);
            res.writeHead(301, {
                location: context.url
            });
            res.end();
        } else {
            res.status(200).send(`<!doctype html>\n${ html }`);
        }
    });
    server.listen(appConfig.server.port, (err) => {
        if (err) {
            console.error('server error: ', err);
            throw err;
        }

        console.log(`Server is listening on: ${appConfig.server.port}`);
    });
}
