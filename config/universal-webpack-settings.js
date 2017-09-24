const path = require('path');

module.exports = {
    server: {
        input: path.resolve('./server.babel.js'),
        output: path.resolve('./server.js')
    }
};