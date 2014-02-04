define(['jquery', 'kinetic'], function ($, Kinetic) {
    var userLayer = new Kinetic.Layer({
        x: 0,
        y: 0,
        width: 128,
        height: 128
    });
    var xPos = userLayer.getOffsetX(), yPos = userLayer.getOffsetY();

    var imageObj = new Image();
    imageObj.onload = function() {
        var user = new Kinetic.Image({
            x: 38,
            y: 0,
            image: imageObj,
            width: 43,
            height: 128
        });
        // add the shape to the userLayer
        userLayer.add(user);
    };
    $(document).on('keydown', function(e) {
        console.log(xPos +' ' + yPos);
        if (e.keyCode === 37 && xPos > 0) {
            xPos -= userLayer.getWidth();
        }
        else if (e.keyCode === 39 && xPos < 64000) {
            xPos += userLayer.getWidth();
        }
        else if (e.keyCode === 38 && yPos > 0) {
            yPos -= userLayer.getHeight();
        }
        else if (e.keyCode === 40&& yPos < 64000) {
            yPos += userLayer.getHeight();
        }
        new Kinetic.Tween({
            node: userLayer,
            duration: .5,
            x: xPos,
            y: yPos
        }).play();
    });
    imageObj.src = 'images/users/user1.png';


    return userLayer;
});
