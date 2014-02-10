define([
    'jquery',
    'kinetic',
    'services/infoMap'
], function($, Kinetic, infoMap) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        map = [],
        sprites = [],
        otherUsersLayer = new Kinetic.Layer({
            x: SQUARE,
            y: SQUARE,
            width: MAP_SIZE * SQUARE*2,
            height: MAP_SIZE * SQUARE*2
        });

    infoMap.on('map', function(gotMap) {
        map = gotMap;
    });

    function moveTo(oldX, oldY, x, y, spawn) {
        var speed;
        if (spawn) {
            speed = SPAWN_SPEED;
        } else {
            speed = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)) / SPEED;
        }
        if (x > pos.x) {
            sprites[oldX][oldY].setAnimation('right');
        } else if (x < pos.x) {
            sprites[oldX][oldY].setAnimation('left');
        } else if (y < pos.y) {
            sprites[oldX][oldY].setAnimation('up');
        } else {
            sprites[oldX][oldY].setAnimation('idle');
        }
        moving = true;
        new Kinetic.Tween({
            node: userLayer,
            duration: speed,
            x: x * SQUARE,
            y: y * SQUARE,
            onFinish: function () {
                if (keyMove === false) {
                    sprite.setAnimation('idle');
                }
                moving = false;
            }
        }).play();
        pos.x = x;
        pos.y = y;
    }

//    infoMap.on('move', function(oldPos){});
    for (var xPos = 0; xPos < 25; xPos++) {
        sprites[xPos] = new Array(25);
        for (var yPos = 0; yPos < 25; yPos++) {
            if (map.user != '') {
                image = new Image();
                image.src = 'images/users/user.png';
                image.onload = function () {
                    sprite[xPos][yPos] = new Kinetic.Sprite({
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