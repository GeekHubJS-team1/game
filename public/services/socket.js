define(['socket.io'], function (io) {
    var connected = false,
        started = false,
        socket = io.connect();

    socket.on('login:success', function () {
        connected = true;
        started && socket.emit('start');
    });

    socket.start = function () {
        started = true;
        connected && socket.emit('start');
    }
    return socket;
});
