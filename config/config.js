'use strict';

export default {

    // Setting up for the production server
    server: {
        host: '127.0.0.1',
        port: 3000
    },
    
    // Setting up for the dev server
    devServer: {
        host: '127.0.0.1',
        port: 8050
    },
    
    // Setting up for the db
    mysql: {
        host : '127.0.0.1',
        user : 'root',
        password : 'typedef',
        database : 'dpk',
        charset: 'utf8'
    }
};
