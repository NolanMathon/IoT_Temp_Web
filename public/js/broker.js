var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
var port = 1883

server.listen(port, function () {
  console.log('server listening on port', port)
})
aedes.on('subscribe', function (subscriptions, client) {
 console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
     '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'), 'from broker', aedes.id)
})
aedes.on('unsubscribe', function (subscriptions, client) {
 console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
     '\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker', aedes.id)
})
aedes.on('client', function (client) {
 console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})
aedes.on('clientDisconnect', function (client) {
 console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})
aedes.on('publish', async function (packet, client) {
 console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
})