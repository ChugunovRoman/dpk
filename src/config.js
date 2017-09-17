'use strict';

export default {

    // Настройки сервера для nodeJS
	server: {
		host: "localhost",
		port: 3000,
	},

    // Настройки для knex
    mysql: {
        host : '127.0.0.1',
        user : 'root',
        password : 'typedef',
        database : 'dpk',
        charset: "utf8"
    }
};
