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

    socket.on('spawn', function (userLogin, location, pos) {
        player.emit('spawn', pos, userLogin);
        player.emit('map', location);
    });

    socket.on('move', function (pos, duration) {
        player.emit('move', pos, duration);
    });

    return player;
});
