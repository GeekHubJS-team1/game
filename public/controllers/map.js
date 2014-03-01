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
        var imageDoor, image;
        layer.removeChildren();
        image = new Image();
        image.onload = function () {
            var rect = new Kinetic.Rect({
                x: -MARGIN_SIZE / 2,
                y: -MARGIN_SIZE / 2,
                width: MAP_SIZE * SQUARE + MARGIN_SIZE,
                height: MAP_SIZE * SQUARE + MARGIN_SIZE,
                fillPatternImage: image
            });
            var bounds = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: MAP_SIZE * SQUARE,
                height: MAP_SIZE * SQUARE,
                stroke: '#ff0000',
                strokeWidth: 1
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
                            x: pos.x * SQUARE,
                            y: pos.y * SQUARE,
                            width: SQUARE,
                            height: SQUARE
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

    return layer;
});
