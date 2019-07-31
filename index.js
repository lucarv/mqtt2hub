'use strict';
require('dotenv').config();
var mqtt = require('mqtt');
var mclient = mqtt.connect(process.env.broker);

var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var connectionString = process.env.CS;
var azclient = Client.fromConnectionString(connectionString, Protocol);
azclient.open(function (err) {
    if (err) {
        console.error('Could not connect: ' + err.message);
    } else {
        console.log('Client connected');
    }
})

//handle incoming messages
mclient.on('message', function (topic, payload, packet) {
    if (topic != 'testtopic') {
        let azurePayload = JSON.parse(payload);
        azurePayload.deviceId = topic;
        let message = new Message(JSON.stringify(azurePayload));
        azclient.sendEvent(message, function (err) {
            if (err) {
                console.error('Could not send: ' + err.toString());
                process.exit(-1);
            } else {
                console.log('Message sent:  ' + JSON.stringify(azurePayload));
            }
        })
    }
})

mclient.on("connect", function () {
    console.log("connected  " + mclient.connected);
    mclient.subscribe('#', function (err) { // subscribe to everything
        if (err) {
            console.log(err)
        }
    })
})
//handle errors
mclient.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});
