const path = require('path');

module.exports = {
    server: {
        input: path.resolve('./src/server.js'),
        output: path.resolve('./server/server.js')
    }
};