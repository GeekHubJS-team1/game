define(['jquery', 'kinetic'], function ($, Kinetic) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        SPEED = 5,
        userLayer, image, moving, sprite,
        player = {x: 0, y: 0};

    function checkPos(x, y) {

        if (x < 0 || x > (MAP_SIZE - 1)) {
            return false;
        }
        if (y < 0 || y > (MAP_SIZE - 1)) {
            return false;
        }
        return true;
    }

    function moveTo(x, y) {
        var speed;
        if (!checkPos(x, y)) {
            return;
        }
        speed = Math.sqrt(Math.pow(player.x - x, 2) + Math.pow(player.y - y, 2)) / SPEED;
        if (x > player.x) {
            sprite.setAnimation('right');
        } else if (x < player.x) {
            sprite.setAnimation('left');
        } else if (y < player.y) {
            sprite.setAnimation('up');
        }
        moving = true;
        new Kinetic.Tween({
            node: userLayer,
            duration: speed,
            x: x * SQUARE,
            y: y * SQUARE,
            onFinish: function () {
                sprite.setAnimation('idle');
                moving = false;
            }
        }).play();
        player.x = x;
        player.y = y;
        moveStage(speed);
    }

    function moveStage(speed) {
        var stage = userLayer.parent;
        if (((player.x - 1) * SQUARE + stage.x) < 0) {
            stage.x = -(player.x - 1) * SQUARE;
        } else if (((player.x + 2) * SQUARE + stage.x) > window.innerWidth) {
            stage.x = -(player.x + 2) * SQUARE + window.innerWidth;
        }
        if (((player.y - 1) * SQUARE + stage.y) < 0) {
            stage.y = -(player.y - 1) * SQUARE;
        } else if (((player.y + 2) * SQUARE + stage.y) > window.innerHeight) {
            stage.y = -(player.y + 2) * SQUARE + window.innerHeight;
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
        moveTo(2, 2);
    };

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
        moveTo(newX, newY);
    });

    $(document).on('keydown', function (e) {
        if (moving || $('#textMessage').is( ":focus" )) {
            return;
        }
        if (e.keyCode === 37 || e.keyCode === 65) {
            moveTo(player.x - 1, player.y);
        }
        else if (e.keyCode === 39 || e.keyCode === 68) {
            moveTo(player.x + 1, player.y);
        }
        else if (e.keyCode === 38 || e.keyCode === 87) {
            moveTo(player.x, player.y - 1);
        }
        else if (e.keyCode === 40 || e.keyCode === 83) {
            moveTo(player.x, player.y + 1);
        }
    });

    return userLayer;
});