/**
 * Created by User on 14.02.14.
 */
define([
    'services/socket',
    'services/player',
    'controllers/infoBoxes',
    'EventEmitter'
], function (player, infoBoxes, EventEmitter) {
    var duel = new EventEmitter();
    socket.on('duel:proposition', function (name) {
        duel.emit('duel:proposition', function (name) {
            infoBoxes.duel(name);
        });
    });
    return duel;
});