define([
    'services/socket',
    'controllers/infoBoxes',
    'EventEmitter'
], function (socket, infoBoxes, EventEmitter) {
    var duel = new EventEmitter();
    duel.proposition = function (pos, opponent) {
        socket.emit('duel:proposition', pos, opponent);
    };
    duel.finish = function (opponent) {
        socket.emit('duel:finish', opponent);
    };

    duel.stop = function (user) {
        socket.emit('duel:stop', user);
    };

    socket.on('duel:proposition', function (pos, opponent) {
        duel.emit('duel:proposition', pos, opponent);
    });
    socket.on('duel:stop', function () {
        duel.emit('duel:stop');
    });
    socket.on('duel:won', function (user, level) {
        duel.emit('duel:won', user, level);
    });
    socket.on('duel:lost', function (user) {
        duel.emit('duel:lost', user);
    });

    return duel;
});