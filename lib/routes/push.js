var pushy = require('pushy-node');
var db = require('../../util/db');
var config = require('../../config');

// Initialize Pushy with Secret API Key
var api = new pushy(config.pushy.secretApiKey);

module.exports = function (req, res) {
    // Fetch all registered device tokens
    var devices = db.read();
    console.log('devices', devices);

    // No devices registered yet?
    if (devices.length === 0) {
        return res.status(500).send({ error: 'Please register at least one device before attempting to send notifications.' });
    }

    //var to = ['379d424b0cf1fe9c81a3e4'];

    // Set push payload data to deliver to devices
    var data = {
        message: 'Hello Worlddddddddddddd!'
    };

    // Set sample iOS notification fields
    var options = {
        notification: {
            badge: 1,
            sound: 'ping.aiff',
            body: 'Hello World \u270c'
        },
    };

    // Send push notification
    api.sendPushNotification(data, devices, options, function (err, id) {
        // Request failed?
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        // Push sent successfully
        res.send({ success: true, pushId: id });
    });
};