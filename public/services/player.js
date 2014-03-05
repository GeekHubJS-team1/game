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

    player.activateItem = function (index) {
        socket.emit('item:activate', index);
    };

    socket.on('spawn', function (userLogin, location, pos, level) {
        player.emit('spawn', pos, userLogin);
        player.emit('map', location);
        player.emit('level', level);
    });

    socket.on('move', function (pos, duration, item) {
        player.emit('move', pos, duration);
        item && player.emit('item', item, true);
    });

    socket.on('item:found', function (item) {
        player.emit('item', item, true);
    });

    socket.on('level', function (level) {
        player.emit('level', level);
    });

    socket.on('items', function (items) {
        player.emit('items', items);
    });

    socket.on('duel:proposition', function (name) {
        player.emit('duel:proposition', name);
    });

    return player;
});
