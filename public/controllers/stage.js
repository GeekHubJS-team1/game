define([
    'kinetic',
    'controllers/map',
    'controllers/player'
], function (Kinetic, map, player) {
    var container = document.querySelector('#game-area');
    var stage = new Kinetic.Stage({
        container: 'game-area',
        width: container.clientWidth,
        height: container.clientHeight,
        x: 128,
        y: 128
    });

    stage.x = stage.y = 128;

    stage.add(map);
    stage.add(player);

    window.addEventListener('resize', function () {
        stage.setWidth(container.clientWidth);
        stage.setHeight(container.clientHeight);
        stage.draw();
    });
});
