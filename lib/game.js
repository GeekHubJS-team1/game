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

    io.sockets.on('session:connection', function (socket) {
        var session = socket.session,
            user = db.users.filter(function (user) {
                return user.login === session.user;
            })[0];
        do {
            user.pos = {
                x: Math.floor(Math.random() * (24 + 1)),
                y: Math.floor(Math.random() * (24 + 1))
            };
        } while (!user.pos || db.map[user.pos.x][user.pos.y].user != '');

        socket.emit('spawn', user.pos);
        socket.emit('map', db.map.map(function (row) {
            return row.map(function (cell) {
                return cell.user;
            });
        }));
        socket.broadcast.emit('user:spawn', user.login, user.pos);
        db.map[user.pos.x][user.pos.y].user = user.login;
        socket.on('move', function (pos) {
            if (!checkPos(pos.x, pos.y)) {
                return;
            }
            db.map[user.pos.x][user.pos.y].user = '';
            user.pos = pos;
            db.map[pos.x][pos.y].user = user.login;
            socket.emit('move', pos);
            socket.broadcast.emit('user:move', user.login, user.pos);
        });
        socket.on('disconnect', function () {
            db.map[user.pos.x][user.pos.y].user = '';
        });
    });
};
