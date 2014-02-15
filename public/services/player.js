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

    socket.on('spawn', function (pos, userLogin) {
        player.emit('spawn', pos, userLogin);
    });

    socket.on('move', function (pos) {
        player.emit('move', pos);
    });

    socket.on('duel:proposition', function (name) {
        player.emit('duel:proposition', name);
    });


    return player;
});
