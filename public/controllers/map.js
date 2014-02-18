define([
    'kinetic',
    'services/player',
    'json!data/maps.json'
], function (Kinetic, player, maps) {
    var MAP_SIZE = 25,
        SQUARE = 128,
        MARGIN_SIZE = 3072;

    var layer = new Kinetic.Layer();

    player.on('map', function (mapName) {
        var imageDoor;
        layer.removeChildren();
        var image = new Image();
        image.onload = function () {
            var rect = new Kinetic.Rect({
                x: -MARGIN_SIZE,
                y: -MARGIN_SIZE,
                width: MAP_SIZE * 256 + MARGIN_SIZE * 2,
                height: MAP_SIZE * 256 + MARGIN_SIZE * 2,
                fillPatternImage: image
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

            if (maps[mapName].doors) {
                imageDoor = new Image();
                imageDoor.onload = function () {
                    var doors = maps[mapName].doors,
                        pos, door;
                    for (door in maps[mapName].doors) {
                        if (!maps[mapName].doors.hasOwnProperty(door)) return;
                        pos = doors[door];
                        layer.add(new Kinetic.Image({
                            image: imageDoor,
                            x: pos.x * SQUARE * 2,
                            y: pos.y * SQUARE * 2,
                            width: SQUARE * 2,
                            height: SQUARE * 2
                        }));
                        layer.draw();
                    }
                };
                imageDoor.src = 'images/door.png';
            }
            layer.draw();
        };
        image.src = 'images/bg/' + maps[mapName].file;
    });

    layer.setScale(.5, .5);
    return layer;
});
