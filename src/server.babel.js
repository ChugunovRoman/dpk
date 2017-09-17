'use strict';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, RouterContext } from 'react-router'

import App from './components/App';

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res) => {
    const context = {};

    const html = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    if(context.url) {
        console.log(context);
        res.writeHead(301, {
            location: context.url
        });
        res.end();
    } else {
        res.status(200).send(renderHTML(html));
    }

});

const assetUrl = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8050'
    : '/';

function renderHTML(componentHTML) {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
      </head>
      <body>
        <div id="app">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});
