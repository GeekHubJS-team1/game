define([
    'jquery',
    'kinetic',
    'services/infoMap',
    'json!data/sprites.json'
], function ($, Kinetic, infoMap, sprites) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        users = {};
    var otherUsersLayer = new Kinetic.Layer();

    infoMap.on('clear', function () {
        users = {};
        otherUsersLayer.removeChildren();
    });

    infoMap.on('move', function (user, pos, duration) {
        var oldPos = users[user].pos,
            sprite = users[user].sprite,
            group = users[user].group;
        infoMap.map[oldPos.x][oldPos.y] = '';
        infoMap.map[pos.x][pos.y] = user;
        if (pos.x > oldPos.x) {
            sprite.setAnimation('right');
        } else if (pos.x < oldPos.x) {
            sprite.setAnimation('left');
        } else if (pos.y < oldPos.y) {
            sprite.setAnimation('up');
        } else {
            sprite.setAnimation('idle');
        }
        new Kinetic.Tween({
            node: group,
            duration: duration,
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
        var group = new Kinetic.Group({
            x: pos.x * SQUARE,
            y: pos.y * SQUARE
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
        group.add(userName);
        otherUsersLayer.add(group);
        group.setZIndex(pos.y);

        users[user] = {
            group: group,
            pos: pos,
            sprite: {setAnimation: function () {}}
        };

        otherUsersLayer.draw();

        image = new Image();
        image.onload = function () {
            var sprite = new Kinetic.Sprite({
                x: 0,
                y: 0,
                image: image,
                frameRate: 1,
                animation: 'idle',
                animations: sprites.geek.animations
            });
            users[user].sprite = sprite;
            group.add(sprite);
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
