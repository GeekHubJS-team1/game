/**
 * Created by User on 14.02.14.
 */
define([
    'services/socket',
    'controllers/infoBoxes',
    'EventEmitter'
], function (socket, infoBoxes, EventEmitter) {
    var duel = new EventEmitter();
    duel.proposition = function (pos, opponent) {
        socket.emit('duel:proposition', pos, opponent);
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

    return duel;
});