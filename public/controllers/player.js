define([
    'jquery',
    'kinetic',
    'services/player'
], function ($, Kinetic, player) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        SPEED = 5,
        SPAWN_SPEED = .1,
        keyMove = false,
        userLayer, image, moving,
        sprite = {setAnimation: function () {}}, // to prevent error when image is not loaded
        pos = {x: 0, y: 0},
        map = [];
        for(i = 0; i < 25; i++) {
            map[i] = new Array(25);
        }


    function moveTo(x, y, spawn) {
        var speed;
        console.log('new position', x, y);
        if (spawn) {
            speed = SPAWN_SPEED;
        } else {
            speed = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)) / SPEED;
        }
        if (x > pos.x) {
            sprite.setAnimation('right');
        } else if (x < pos.x) {
            sprite.setAnimation('left');
        } else if (y < pos.y) {
            sprite.setAnimation('up');
        } else {
            sprite.setAnimation('idle');
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
        moveStage(speed);
    }

    function moveStage(speed) {
        var stage = userLayer.parent;
        if (speed === SPAWN_SPEED) {
            stage.x = -(pos.x + .5) * SQUARE + window.innerWidth / 2;
            stage.y = -(pos.y + .5) * SQUARE + window.innerHeight / 2;
        }
        if (((pos.x - 1) * SQUARE + stage.x) < 0) {
            stage.x = -(pos.x - 1) * SQUARE;
        } else if (((pos.x + 2) * SQUARE + stage.x) > window.innerWidth) {
            stage.x = -(pos.x + 2) * SQUARE + window.innerWidth;
        }
        if (((pos.y - 1) * SQUARE + stage.y) < 0) {
            stage.y = -(pos.y - 1) * SQUARE;
        } else if (((pos.y + 2) * SQUARE + stage.y) > window.innerHeight) {
            stage.y = -(pos.y + 2) * SQUARE + window.innerHeight;
        }

        new Kinetic.Tween({
            node: userLayer.parent,
            duration: speed,
            x: stage.x,
            y: stage.y
        }).play();
    }

    userLayer = new Kinetic.Layer({
        x: 0,
        y: 0,
        width: SQUARE,
        height: SQUARE
    });

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
                    width: 128,
                    height: 128
                }],
                up: [{
                    x: 128,
                    y: 0,
                    width: 128,
                    height: 128
                }],
                right: [{
                    x: 256,
                    y: 0,
                    width: 128,
                    height: 128
                }],
                left: [{
                    x: 384,
                    y: 0,
                    width: 128,
                    height: 128
                }]
            }
        });

        // add the shape to the layer
        userLayer.add(sprite);

        // start sprite animation
        sprite.start();
    };

    player.on('spawn', function (pos) {
        moveTo(pos.x, pos.y, true);
    });

    player.on('map', function(gotMap) {
        map = gotMap;
    });

    player.on('move', function (pos) {
        moveTo(pos.x, pos.y);
    });

    $('#game-area').on('click', function (e) {
        if ($('#textMessage').is( ":focus" )) {
            $('#textMessage').blur();
        }
        var stagePos = userLayer.parent.getPosition(),
            newX, newY;
        if (moving) {
            return;
        }
        newX = Math.floor((e.clientX - stagePos.x) / SQUARE);
        newY = Math.floor((e.clientY - stagePos.y) / SQUARE);
        player.move(newX, newY);
    });

    $(document).on('keydown', function (e) {
        if (moving || $('#textMessage').is( ":focus" )) {
            return;
        }
        if (e.keyCode === 37 || e.keyCode === 65) {
            player.move(pos.x - 1, pos.y);
            keyMove = true;
        }
        else if (e.keyCode === 39 || e.keyCode === 68) {
            player.move(pos.x + 1, pos.y);
            keyMove = true;
        }
        else if (e.keyCode === 38 || e.keyCode === 87) {
            player.move(pos.x, pos.y - 1);
            keyMove = true;
        }
        else if (e.keyCode === 40 || e.keyCode === 83) {
            player.move(pos.x, pos.y + 1);
            keyMove = true;
        }
    });
    $(document).on('keyup', function (e) {
        if ([37, 65, 39, 68, 38, 87, 40, 83].indexOf(e.keyCode) > -1) {
            keyMove = false;
            if (!moving) {
                sprite.setAnimation('idle');
            }
        }
    });

    return userLayer;
});