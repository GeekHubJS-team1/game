define([
    'kinetic',
    'controllers/map',
    'controllers/player',
    'controllers/infoMap'
], function (Kinetic, map, player, infoMap) {
    var SQUARE = 128,
        container = document.querySelector('#game-area'),
        stage = new Kinetic.Stage({
        container: 'game-area',
        width: container.clientWidth,
        height: container.clientHeight,
        x: SQUARE,
        y: SQUARE
    });

    stage.x = stage.y = SQUARE;

    stage.add(map);
    stage.add(infoMap);
    stage.add(player);

    window.addEventListener('resize', function () {
        stage.setWidth(container.clientWidth);
        stage.setHeight(container.clientHeight);
        stage.draw();
    });
});
