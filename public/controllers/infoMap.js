define([
    'jquery',
    'kinetic',
    'services/infoMap'
], function ($, Kinetic, infoMap) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        SPEED = 5,
        users = {};
    otherUsersLayer = new Kinetic.Layer();

    infoMap.on('move', function (user, pos) {
        var oldPos = users[user].pos,
            sprite = users[user].sprite
        if (pos.x > oldPos.x) {
            sprite.setAnimation('right');
        } else if (pos.x < oldPos.x) {
            sprite.setAnimation('left');
        } else if (pos.y < oldPos.y) {
            sprite.setAnimation('up');
        } else {
            sprite.setAnimation('idle');
        }
        speed = Math.sqrt(Math.pow(oldPos.x - pos.x, 2) + Math.pow(oldPos.y - pos.y, 2)) / SPEED;
        new Kinetic.Tween({
            node: sprite,
            duration: speed,
            x: pos.x * SQUARE,
            y: pos.y * SQUARE,
            onFinish: function () {
                sprite.setAnimation('idle');
            }
        }).play();
        users[user].pos = pos;
    });

    infoMap.on('spawn', function (user, pos) {
        var sprite = new Kinetic.Sprite({
            x: pos.x * SQUARE,
            y: pos.y * SQUARE,
            image: image,
            frameRate: 1,
            animation: 'idle',
            animations: {
                idle: [
                    {
                        x: 0,
                        y: 0,
                        width: SQUARE,
                        height: SQUARE
                    }
                ],
                up: [
                    {
                        x: SQUARE,
                        y: 0,
                        width: SQUARE,
                        height: SQUARE
                    }
                ],
                right: [
                    {
                        x: 2 * SQUARE,
                        y: 0,
                        width: SQUARE,
                        height: SQUARE
                    }
                ],
                left: [
                    {
                        x: 3 * SQUARE,
                        y: 0,
                        width: SQUARE,
                        height: SQUARE
                    }
                ]
            }
        });
        otherUsersLayer.add(sprite);
        users[user] = {
            sprite: sprite,
            pos: pos
        };
    });

    infoMap.on('out', function (user) {
        users[user].sprite.remove();
        otherUsersLayer.draw();
        delete users[user];
    });

    image = new Image();
    image.src = 'images/users/user.png';

    return otherUsersLayer;
});
