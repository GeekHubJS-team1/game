define([
    'services/socket',
    'EventEmitter'
], function(socket, EventEmitter) {
    var infoMap = new EventEmitter();

    socket.on('map', function (map) {
        infoMap.emit('map', map);
    });
    return infoMap;
});