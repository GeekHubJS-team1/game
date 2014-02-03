define(['kinetic'], function (Kinetic) {
    var mapSize = 100;
    var layer = new Kinetic.Layer();

    var imageGrass = new Image();
    imageGrass.src = 'img/grass.jpg';
    imageGrass.onload = function () {
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: mapSize * 64,
            height: mapSize * 64,
            fillPatternImage: imageGrass
        });
        layer.add(rect);
        layer.draw();
    };

    return layer;
});
