define([
    'services/socket',
    'EventEmitter'
], function() {
    var infoMap = new EventEmitter();

    socket.on('map', function (map) {
        infoMap.emit('map', map);
    });
    return infoMap;
});