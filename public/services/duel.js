/**
 * Created by User on 14.02.14.
 */
define([
    'services/socket',
    'EventEmitter'
], function (socket, EventEmitter) {
    var duel = new EventEmitter();
    socket.on('duel:proposition', function (name, pos) {
        duel.emit('duel:proposition', name, pos);
    });
    return duel;
});