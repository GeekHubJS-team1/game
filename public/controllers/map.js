define(['kinetic'], function (Kinetic) {
    var MAP_SIZE = 25;

    var layer = new Kinetic.Layer();

    var imageGrass = new Image();
    if (Math.random() > 0.5) {
        imageGrass.src = 'images/bg/grass.jpg';
    }
    else {
        imageGrass.src = 'images/bg/sand.jpg';
    }

    imageGrass.onload = function () {
        var rect = new Kinetic.Rect({
            x: -256,
            y: -256,
            width: (MAP_SIZE + 2) * 256,
            height: (MAP_SIZE + 2) * 256,
            fillPatternImage: imageGrass
        });
        layer.add(rect);
        layer.draw();
    };
    layer.setScale(.5, .5);
    return layer;
});