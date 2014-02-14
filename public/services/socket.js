define(['socket.io'], function (io) {
    var socket = io.connect();

    socket.start = function () {
        socket.on('login:success', function () {
            socket.emit('start');
        });
    }
    return socket;
});
