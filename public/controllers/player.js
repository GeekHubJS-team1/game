define(['jquery', 'kinetic'], function ($, Kinetic) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        SPEED = 5,
        userLayer, image, moving,
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
        console.log(speed)
        moving = true;
        new Kinetic.Tween({
            node: userLayer,
            duration: speed,
            x: x * SQUARE,
            y: y * SQUARE,
            onFinish: function () {
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
    image.src = 'images/users/user1.png';
    image.onload = function () {
        var user = new Kinetic.Image({
            x: 0,
            y: 0,
            image: image,
            width: SQUARE,
            height: SQUARE
        });
        // add the shape to the userLayer
        userLayer.add(user);
        moveTo(2, 2);
    };

    $('#game-area').on('click', function (e) {
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
        if (moving) {
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