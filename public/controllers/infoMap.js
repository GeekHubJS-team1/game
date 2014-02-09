define([
    'jquery',
    'services/infoMap'
], function(infoMap) {
    var map = [];

    for(i = 0; i < 25; i++) {
        map[i] = new Array(25);
    }

    infoMap.on('map', function(gotMap) {
        map = gotMap;
    });
});