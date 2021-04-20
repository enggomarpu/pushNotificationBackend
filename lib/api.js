var express = require('express');
var config = require('../config');
var cors = require('cors')

exports.initialize = function () {
    // Initialize API
    var api = express();

    api.use(cors())
    // Setup API routes
    setupRoutes(api);

    // Either use the runtime port or fallback to config
    var port = process.env.PORT || config.api.port;

    // Start listening to API requests from clients
    api.listen(port, function () {
        console.log('[API]', 'Listening on port ' + port);
    });
};

function setupRoutes(api) {
    // Index endpoint
    api.get('/', require('./routes/index'));

    // Send notifications endpoint
    api.get('/push', require('./routes/push'));

    // Device registration endpoint
    api.get('/register/:device', require('./routes/register'));
}