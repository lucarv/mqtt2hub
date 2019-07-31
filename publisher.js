var mqtt = require('mqtt')
const clientId = "mqtt-js-01";

var mclient = mqtt.connect("mqtt://ekskog.net", {
    clientId: clientId
});
let payload = {
    "timestamp": Date.now()
}

console.log("connected flag  " + mclient.connected);
mclient.on('connect', function () {
    var timer_id = setInterval(function(){
        mclient.publish(clientId,JSON.stringify(payload));
    console.log('pub')}
    ,5000);
})

