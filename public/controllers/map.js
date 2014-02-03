define(['kinetic'], function (Kinetic) {
    var container = document.querySelector('#game-area');

    var cellSize = 64;
    var mapSize = 100;

    var stage = new Kinetic.Stage({
        container: 'game-area',
        width: container.clientWidth,
        height: container.clientHeight,
        draggable: true
    });
    var layer = new Kinetic.Layer();

    stage.add(layer);

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

    window.addEventListener('resize', function () {
        stage.setWidth(container.clientWidth);
        stage.setHeight(container.clientHeight);
        stage.draw();
    });
})
;
