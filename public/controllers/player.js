define(['jquery', 'kinetic', 'controllers/map'], function ($, Kinetic, Map) {
    var userLayer = new Kinetic.Layer({
        x: 0,
        y: 0,
        width: 128,
        height: 128
    });
    var userX = userLayer.getOffsetX(), userY = userLayer.getOffsetY(),
    mapX = Map.getOffsetX(), mapY = Map.getOffsetY();

    var imageObj = new Image();
    imageObj.onload = function() {
        var user = new Kinetic.Image({
            x: 3*128,
            y: 2*128,
            image: imageObj,
            width: 128,
            height: 128
        });
        // add the shape to the userLayer
        userLayer.add(user);
        userLayer.draw();
    };
    $(document).on('click', function (e) {
        var stagePos = userLayer.parent.getPosition();
        new Kinetic.Tween({
            node: userLayer,
            duration: .5,
            x: Math.floor((e.clientX - stagePos.x)/128)*128-3*128,
            y: Math.floor((e.clientY - stagePos.y)/128)*128-2*128
        }).play();
        userX = Math.floor((e.clientX - stagePos.x)/128)*128-3*128;
        userY = Math.floor((e.clientY - stagePos.y)/128)*128-2*128;
    });
    $(document).on('keydown', function(e) {
        console.log(mapX+' map '+mapY);
        console.log(userX+' user '+userY);
        if (e.keyCode === 37) {
            if (mapX < 0 && userX <=0) {
                mapX += 128;
            }
            else if (userX > -3*128) {
                userX -= userLayer.getWidth();
            }
        }
        else if (e.keyCode === 39) {
            if (mapX > -1792 && userX > 0 ) {
                mapX -= 128;
            }
            else if (userX < 896) {
                userX += 128;
            }
        }
        else if (e.keyCode === 38) {
            if (mapY < 0 && userY <= -128) {
                mapY += 128;
            }
            else if (userY > -256) {
                userY -= 128;
            }
        }
        else if (e.keyCode === 40) {
            if (mapY > -2560 && userY >= 0) {
                mapY -= 128;
            }
            else if (userY < 256) {
                userY += 128;
            }
        }
        new Kinetic.Tween({
            node: userLayer,
            duration: .5,
            x: userX,
            y: userY
        }).play();
        new Kinetic.Tween({
            node: Map,
            duration: .5,
            x: mapX,
            y: mapY
        }).play();
    });
    imageObj.src = 'images/users/user1.png';


    return userLayer;
});
