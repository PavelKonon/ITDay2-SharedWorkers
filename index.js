var worker = new SharedWorker("worker.js");
worker.port.addEventListener("message", function (e) {
    switch (e.data.type) {
        case 'connections':
            document.getElementById('connections').innerText = e.data.data;
            break;
        case 'date':
            document.getElementById('date').innerText = e.data.data;
            break;
        case 'broadcast':
            document.getElementById('broadcast').innerText = e.data.data;
            break;
    }
}, false);

worker.port.start();

send = function () {
    // post a message to the shared web worker
    worker.port.postMessage(document.getElementById('broadcastMsg').value);
};