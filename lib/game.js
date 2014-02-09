 const MAP_SIZE = 25;

var db = require('./db');

function checkPos(x, y) {

    if (x < 0 || x > (MAP_SIZE - 1)) {
        return false;
    }
    if (y < 0 || y > (MAP_SIZE - 1)) {
        return false;
    }
    return true;
}

module.exports = function (app, io) {
    var online = 0;

    io.sockets.on('session:connection', function (socket) {
        var session = socket.session,
            user = db.users.filter(function (user) {
                return user.login === session.user;
            })[0];
        if (!user.pos) {
            user.pos = {
                x: Math.floor(Math.random() * (24 + 1)),
                y: Math.floor(Math.random() * (24 + 1))
            };
        }
        socket.emit('spawn', user.pos);
        db.map[user.pos.x][user.pos.y].user = user.login;
        socket.emit('map', db.map);
        socket.on('move', function (pos) {
            if (!checkPos(pos.x, pos.y)) {
                return;
            }
            db.map[pos.x][pos.y].user = '';
            user.pos = pos;
            db.map[pos.x][pos.y] = {
                item: 'itemName',
                user: user.login
            };
            socket.emit('move', pos);
        });
    });
};
