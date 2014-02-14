define(['kinetic'], function (Kinetic) {
    var MAP_SIZE = 25,
        MARGIN_SIZE = 3072;

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
            x: -MARGIN_SIZE,
            y: -MARGIN_SIZE,
            width: MAP_SIZE * 256 + MARGIN_SIZE * 2,
            height: MAP_SIZE * 256 + MARGIN_SIZE * 2,
            fillPatternImage: imageGrass
        });
        var bounds = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: MAP_SIZE * 256,
            height: MAP_SIZE * 256,
            stroke: '#ff0000'
        });
        layer.add(rect);
        layer.add(bounds);
        layer.draw();
    };
    layer.setScale(.5, .5);
    return layer;
});
