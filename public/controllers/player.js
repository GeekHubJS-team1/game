define(['jquery', 'kinetic', 'controllers/map'], function ($, Kinetic, Map) {
    var SQUARE = 128,
        MAPWIDTH = 25 * SQUARE,
        MAPHEIGHT = 25 * SQUARE,
        userX = 0,
        userY = 0,
        mapX = Map.getOffsetX(),
        mapY = Map.getOffsetY(),
        userLayer, image, moving;

    function moveMap(x, y) {
        new Kinetic.Tween({
            node: Map,
            duration: .5,
            x: x,
            y: y
        }).play();
    }

    function moveUser(x, y) {
        moving = true;
        new Kinetic.Tween({
            node: userLayer,
            duration: .5,
            x: x,
            y: y,
            onFinish: function() {
                moving = false;
            }
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
        userX = userY = 2 * SQUARE;
        new Kinetic.Tween({
            node: userLayer,
            duration: .5,
            x: userX,
            y: userY
        }).play();
        userLayer.add(user);
        userLayer.draw();
    };

    /*$('#game-area').on('click', function (e) {
     var stagePos = userLayer.parent.getPosition();
     if ((mapX < 0 && userX <= 4*SQUARE) || (mapX > moveMapWidth && userX > 3*SQUARE) ||
     (mapY < 0 && userY < 3*SQUARE) || (mapY >= moveMapHeight && userY >= 2*SQUARE) {
     }
     userX = Math.floor((e.clientX - stagePos.x)/SQUARE-3)*SQUARE;
     userY = Math.floor((e.clientY - stagePos.y)/SQUARE-2)*SQUARE;
     new Kinetic.Tween({
     node: userLayer,
     duration: .5,
     x: userX,
     y: userY
     }).play();
     });*/

    $(document).on('keydown', function (e) {
        if (moving) {
            return;
        }
        console.log(mapX + ' map ' + mapY);
        console.log(userX + ' user ' + userY);
        var screenWidth = window.innerWidth, screenHeight = window.innerHeight,
            moveMapWidth = -Math.floor((MAPWIDTH - screenWidth) / SQUARE) * SQUARE,
            moveMapHeight = -Math.floor((MAPHEIGHT - screenHeight) / SQUARE) * SQUARE,
            moveUserWidth = Math.floor((screenWidth) / SQUARE) * SQUARE,
            moveUserHeight = Math.floor((screenHeight - 2 * SQUARE) / SQUARE) * SQUARE;
        if (e.keyCode === 37 || e.keyCode === 65) {
            if (mapX < 0 && userX <= 4 * SQUARE) {
                mapX += SQUARE;
            }
            else if (userX > 0) {
                userX -= userLayer.getWidth();
            }
        }
        else if (e.keyCode === 39 || e.keyCode === 68) {
            if (mapX > moveMapWidth && userX > 3 * SQUARE) {
                mapX -= SQUARE;
            }
            else if (userX < moveUserWidth) {
                userX += SQUARE;
            }
        }
        else if (e.keyCode === 38 || e.keyCode === 87) {
            if (mapY < 0 && userY < 3 * SQUARE) {
                mapY += SQUARE;
            }
            else if (userY > 0) {
                userY -= SQUARE;
            }
        }
        else if (e.keyCode === 40 || e.keyCode === 83) {
            if (mapY >= moveMapHeight && userY >= 2 * SQUARE) {
                mapY -= SQUARE;
            }
            else if (userY <= moveUserHeight) {
                userY += SQUARE;
            }
        }
        moveUser(userX, userY);
        moveMap(mapX, mapY);
    });

    return userLayer;
});