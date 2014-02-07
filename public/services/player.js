define([
    'services/socket',
    'EventEmitter'
], function (socket, EventEmitter) {
    var player = new EventEmitter();

    setTimeout(function () {
        player.emit('spawn', {
            x: Math.floor(Math.random() * (24 + 1)),
            y: Math.floor(Math.random() * (24 + 1))
        });
    }, 10);


    return player;
});
