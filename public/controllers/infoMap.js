define([
    'jquery',
    'kinetic',
    'services/infoMap',
    'json!data/sprites.json'
], function ($, Kinetic, infoMap, sprites) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        SPEED = 5,
        users = {};
    var otherUsersLayer = new Kinetic.Layer();

    infoMap.on('clear', function () {
        users = {};
        otherUsersLayer.removeChildren();
    });

    infoMap.on('move', function (user, pos) {
        var oldPos = users[user].pos,
            sprite = users[user].sprite,
            group = users[user].group;
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
            node: group,
            duration: speed,
            x: pos.x * SQUARE,
            y: pos.y * SQUARE,
            onFinish: function () {
                sprite.setAnimation('idle');
            }
        }).play();
        group.setZIndex(pos.y);
        users[user].pos = pos;
    });

    infoMap.on('spawn', function (user, pos) {
        image = new Image();
        image.onload = function () {
            var group = new Kinetic.Group({
                x: pos.x * SQUARE,
                y: pos.y * SQUARE
            });
            var sprite = new Kinetic.Sprite({
                x: 0,
                y: 0,
                image: image,
                frameRate: 1,
                animation: 'idle',
                animations: sprites.geek.animations
            });
            var userName = new Kinetic.Text({
                x: 0,
                y: -20,
                width: SQUARE,
                text: user,
                align: 'center',
                fontSize: 12,
                fontFamily: 'PressStart2P',
                fill: '#eb6a2b'
            });
            var rect = new Kinetic.Rect({
                x: 0,
                y: -27,
                fill: '#000',
                opacity: 0.5,
                width: SQUARE,
                height: 25,
                cornerRadius: 5
            });

            group.add(rect);
            group.add(sprite);
            group.add(userName);
            otherUsersLayer.add(group);
            group.setZIndex(pos.y);

            users[user] = {
                sprite: sprite,
                group: group,
                pos: pos
            };

            otherUsersLayer.draw();
        };
        image.src = 'images/users/' + sprites.geek.file;

    });

    infoMap.on('out', function (user) {
        users[user].group.remove();
        otherUsersLayer.draw();
        delete users[user];
    });

    return otherUsersLayer;
});
