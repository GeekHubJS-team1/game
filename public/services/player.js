define([
    'services/socket',
    'EventEmitter'
], function (socket, EventEmitter) {
    var player = new EventEmitter();
    player.move = function (x, y) {
        socket.emit('move', {
            x: x,
            y: y
        });
    };

    socket.on('spawn', function (pos) {
        player.emit('spawn', pos);
    });

    socket.on('map', function (map) {
        player.emit('map', map);
    });

    socket.on('move', function (pos) {
        player.emit('move', pos);
    });

    return player;
});
