define([
    'jquery',
    'kinetic',
    'services/infoMap'
], function($, Kinetic, infoMap) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        map = [],
        otherUsersLayer = new Kinetic.Layer({
            x: SQUARE,
            y: SQUARE,
            width: MAP_SIZE * SQUARE*2,
            height: MAP_SIZE * SQUARE*2
        });

    infoMap.on('map', function(gotMap) {
        map = gotMap;
    });

    for (var xPos = 0; xPos < 25; xPos++) {
        for (var yPos = 0; yPos < 25; yPos++) {
            if (map.user != '') {
                image = new Image();
                image.src = 'images/users/user.png';
                image.onload = function () {
                    sprite = new Kinetic.Sprite({
                        x: 0,
                        y: 0,
                        image: image,
                        animation: 'idle',
                        animations: {
                            idle: [{
                                x: 0,
                                y: 0,
                                width: SQUARE,
                                height: SQUARE
                            }],
                            up: [{
                                x: SQUARE,
                                y: 0,
                                width: SQUARE,
                                height: SQUARE
                            }],
                            right: [{
                                x: 2*SQUARE,
                                y: 0,
                                width: SQUARE,
                                height: SQUARE
                            }],
                            left: [{
                                x: 3*SQUARE,
                                y: 0,
                                width: SQUARE,
                                height: SQUARE
                            }]
                        }
                    });


                    // add the shape to the layer
                    otherUsersLayer.add(sprite);

                    // start sprite animation
                    sprite.start();
                };
            }
        }
    }

    return otherUsersLayer;
});