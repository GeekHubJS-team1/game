define([
    'services/socket',
    'EventEmitter'
], function(socket, EventEmitter) {
    var map,
        infoMap = new EventEmitter();

    socket.on('map', function (newMap) {
        infoMap.map = map = newMap;
        map.forEach(function (row, x) {
            row.forEach(function (user, y) {
                if (user != '') {
                    infoMap.emit('spawn', user, {x: x, y: y});
                }
            });
        });
    });
    socket.on('user:spawn', function (user, pos) {
        infoMap.emit('spawn', user, pos);
    });
    socket.on('user:move', function (user, pos) {
        infoMap.emit('move', user, pos);
    });
    socket.on('user:out', function (user) {
        infoMap.emit('out', user);
    });
    return infoMap;
});