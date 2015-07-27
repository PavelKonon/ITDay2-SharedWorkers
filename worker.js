var connections = 0; // count active connections
var peers = [];

self.addEventListener("connect", function (e) {

    var port = e.ports[0];
    connections++;
    peers.push(port);
    port.postMessage({type: 'connections', data: connections});
    port.addEventListener("message", function (e) {
        peers.forEach(function (port) {
            port.postMessage({type: 'broadcast', data: e.data});
        });
    }, false);

    port.start();

}, false);

setInterval(function () {
    var date = new Date();
    peers.forEach(function (port) {
        port.postMessage({type: 'date', data: date});
    });
}, 1000);
