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

    socket.on('spawn', function (userLogin, location, pos) {
        player.emit('spawn', pos, userLogin);
        player.emit('map', location);
    });

    socket.on('move', function (pos, duration) {
        player.emit('move', pos, duration);
    });

    socket.on('duel:proposition', function (name) {
        player.emit('duel:proposition', name);
    });


    return player;
});
