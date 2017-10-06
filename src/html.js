import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

const html = ({ assets, component, store }) => {
    // console.log('assets: ', assets);
    // console.log('component: ', component);
    // console.log('store: ', store);

    const head = Helmet.rewind();
    let data = '';

    if (store) {
        data = `
            window.__data=${serialize(store.getState())};
            window._env=${serialize(_env)}
        `;
    }

    return (

        <html lang='ru-RU'>
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}

                <link rel='shortcut icon' href='/favicon.ico' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link
                    href={assets.styles.client}
                    media='screen, projection'
                    rel='stylesheet'
                    type='text/css'
                    charSet='UTF-8'
                />

                {__PRODUCTION__ && Object.keys(assets.styles).map((style, key) => {
                    return (
                        <link
                            href={assets.styles[style]}
                            key={key}
                            media='screen, projection'
                            rel='stylesheet'
                            type='text/css'
                            charSet='UTF-8'
                        />
                    );
                })}
            </head>
            <body>
                <div id='app'
                    dangerouslySetInnerHTML={{ __html: component ? renderToString(component) : '' }}
                />

                <script
                    dangerouslySetInnerHTML={{ __html: data }}
                    charSet='UTF-8'
                />

                <script src={assets.javascript.client} charSet='UTF-8' />
            </body>

        </html>
    );
};

html.PropTypes = {
    assets: PropTypes.object.isRequired,
    component: PropTypes.node.isRequired,
    store: PropTypes.object
};

export default html;
