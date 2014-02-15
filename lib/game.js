const MAP_SIZE = 25;

var db = require('./db');
var mapsSpec = require('../public/data/maps.json');

function checkPos(map, x, y) {
    if (x < 0 || x > (MAP_SIZE - 1)) {
        return false;
    }
    if (y < 0 || y > (MAP_SIZE - 1)) {
        return false;
    }
    if (map[x][y].door) {
        return map[x][y].door;
    }
    if (map[x][y].user != '') {
        return false;
    }
    return true;
}

var maps = {}, i, j, map, door, doors, doorName, name;
for (name in mapsSpec) {
    if (mapsSpec.hasOwnProperty(name)) {
        map = [];
        for (i = 0; i < 25; i++) {
            map[i] = [];
            for (j = 0; j < 25; j++) {
                map[i][j] = {
                    item: '',
                    user: ''
                };
            }
        }
        doors = mapsSpec[name].doors;
        for (doorName in doors) {
            if (doors.hasOwnProperty(doorName)) {
                door = doors[doorName];
                console.log(door)
                map[door.x][door.y].door = doorName;
            }
        }
        maps[name] = map;
    }
}

module.exports = function (app, io) {
    io.sockets.on('session:connection', function (socket) {
        var session = socket.session;
        db.users.find({login: session.user}, function (err, user) {
            var map, room = user.location;

            function spawn() {
                map = maps[room];
                while (!user.pos || map[user.pos.x][user.pos.y].user != '') {
                    user.pos = {
                        x: Math.floor(Math.random() * (24 + 1)),
                        y: Math.floor(Math.random() * (24 + 1))
                    };
                };
                db.users.update({_id: user._id}, {$set: {pos: user.pos, location: room}}, {}, function (err) {
                    if (err) throw err;
                });

                socket.join(room);
                socket.emit('spawn', user.login, room, user.pos);
                socket.emit('map', map.map(function (row) {
                    return row.map(function (cell) {
                        if (cell.user != user.login) {
                            return cell.user;
                        }
                        return '';
                    });
                }));
                socket.broadcast.to(room).emit('user:spawn', user.login, user.pos);
                map[user.pos.x][user.pos.y].user = user.login;
            }
            function changeLocation(newLoc) {
                socket.broadcast.to(room).emit('user:gone', user.login);
                socket.leave(room);
                // get the position of door to previous location
                user.pos = mapsSpec[newLoc].doors[room];
                // change room and location
                room = newLoc;
                spawn();
            }

            if (!room) {
                room = 'grass';
            }

            spawn();

            socket.on('move', function (pos) {
                var check = checkPos(map, pos.x, pos.y);
                if (!check) {
                    return;
                }
                map[user.pos.x][user.pos.y].user = '';
                user.pos = pos;
                if (check !== true) {
                    changeLocation(check);
                    return;
                }
                map[pos.x][pos.y].user = user.login;
                socket.emit('move', pos);
                socket.broadcast.to(room).emit('user:move', user.login, pos);
                db.users.update({_id: user._id}, {$set: {pos: user.pos}}, {}, function (err) {
                    if (err) throw err;
                });
            });
            socket.on('disconnect', function () {
                map[user.pos.x][user.pos.y].user = '';
                socket.broadcast.to(room).emit('user:gone', user.login);
            });
        });
    });
};
