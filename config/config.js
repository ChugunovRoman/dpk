'use strict';

export default {

    // Setting up for the production server
    server: {
        host: 'localhost',
        port: 3000
    },
    
    // Setting up for the dev server
    devServer: {
        host: '127.0.0.1',
        port: 3001
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
