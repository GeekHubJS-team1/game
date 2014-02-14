const MAP_SIZE = 25;

var db = require('./db');

function checkPos(x, y) {
    if (x < 0 || x > (MAP_SIZE - 1)) {
        return false;
    }
    if (y < 0 || y > (MAP_SIZE - 1)) {
        return false;
    }
    if (map[x][y].user != '') {
        return false;
    }
    return true;
}

var i, j, map = [];
for (i = 0; i < 25; i++) {
    map[i] = new Array(25);
    for (j = 0; j < 25; j++) {
        map[i][j] = {
            item: '',
            user: ''
        };
    }
}

module.exports = function (app, io) {
    io.sockets.on('session:connection', function (socket) {
        var session = socket.session;
        db.users.find({login: session.user}, function (err, user) {
            while (!user.pos || map[user.pos.x][user.pos.y].user != '') {
                user.pos = {
                    x: Math.floor(Math.random() * (24 + 1)),
                    y: Math.floor(Math.random() * (24 + 1))
                };
            };

            db.users.update({_id: user._id}, {$set: {pos: user.pos}}, {}, function (err) {
                if (err) throw err;
            });

            socket.emit('spawn', user.pos, user.login);
            socket.emit('map', map.map(function (row) {
                return row.map(function (cell) {
                    if (cell.user != user.login) {
                        return cell.user;
                    }
                    return '';
                });
            }));
            socket.broadcast.emit('user:spawn', user.login, user.pos);
            map[user.pos.x][user.pos.y].user = user.login;
            socket.on('move', function (pos) {
                if (!checkPos(pos.x, pos.y)) {
                    return;
                }
                map[user.pos.x][user.pos.y].user = '';
                user.pos = pos;
                map[pos.x][pos.y].user = user.login;
                socket.emit('move', pos);
                socket.broadcast.emit('user:move', user.login, pos);
                db.users.update({_id: user._id}, {$set: {pos: user.pos}}, {}, function (err) {
                    if (err) throw err;
                });
            });
            socket.on('disconnect', function () {
                map[user.pos.x][user.pos.y].user = '';
            });
        });
    });
};
