define([
    'jquery',
    'services/socket',
    'EventEmitter'
], function ($, socket, EventEmitter) {
    var SQUARE = 128,
        player = new EventEmitter();
    player.move = function (x, y) {
        socket.emit('move', {
            x: x,
            y: y
        });
    };

    socket.on('spawn', function (userLogin, location, pos, level) {
        player.emit('spawn', pos, userLogin, level);
        player.emit('map', location);
    });

    socket.on('move', function (pos, duration, item) {
        player.emit('move', pos, duration, item);
    });

    socket.on('duel:proposition', function (name) {
        player.emit('duel:proposition', name);
    });

    return player;
});
