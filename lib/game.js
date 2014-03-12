const MAP_SIZE = 25, POSSIBLE_ITEMS = 15;

var extend = require('util')._extend,
    db = require('./db'),
    mapsSpec = require('../public/data/maps.json'),
    items = require('../public/data/items.json');
const  NUMBER_ITEMS = items.names.length;

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
    return map[x][y].user == '';

}

function calcDuration(pos1, pos2) {
    const SPEED = 5;
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)) / SPEED;
}

var maps = {}, i, j, map, door, doors, doorName, name, itemName, itemPos = {};
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
                map[door.x][door.y].door = doorName;
            }
        }
        for (i = 0; i < POSSIBLE_ITEMS;) {
            itemPos.x = Math.floor(Math.random()*MAP_SIZE);
            itemPos.y = Math.floor(Math.random()*MAP_SIZE);
            if (map[itemPos.x][itemPos.y].item == '' && !map[itemPos.x][itemPos.y].door) {
                itemName = items.names[Math.floor(Math.random()*NUMBER_ITEMS)];
                map[itemPos.x][itemPos.y].item = itemName;
                i++
            }
        }
        maps[name] = map;
    }
}

module.exports = function (app, io) {
    io.sockets.on('session:connection', function (socket) {
        var session = socket.session;
        db.users.findOne({login: session.user}, function (err, user) {
            var map, room = user.location;

            function spawn() {
            	// x, y - offset for search
                var x = 0, y = 0, n = 0, duration,
                    oldPos = extend({}, user.pos);
                map = maps[room];
                // search closest empty cell
                do {
                    if (checkPos(map, user.pos.x + x, user.pos.y + y) === true) {
                        user.pos.x += x;
                        user.pos.y += y;
                        break;
                    }
                    if (x >= 0 && y >= 0 && x == y) {
                        y++;
                        n++;
                    } else if (y == n && x != -n) {
                        x--;
                    } else if (x == -n && y != -n) {
                        y--;
                    } else if (y == -n && x != n) {
                        x++;
                    } else if (x == n && y != n) {
                        y++;
                    }
                } while (1);
                db.users.update({_id: user._id}, {$set: {pos: user.pos, location: room}});

                socket.join(room);
                // pass to client 2d array of players on current map
                socket.emit('map', map.map(function (row) {
                    return row.map(function (cell) {
                        if (cell.user != user.login) {
                            return cell.user;
                        }
                        return '';
                    });
                }));
                // spawn at old position or door
                socket.emit('spawn', user.login, room, oldPos, user.level);
                socket.broadcast.to(room).emit('user:spawn', user.login, oldPos, false);
                duration = calcDuration(oldPos, user.pos);
                socket.emit('move', user.pos, duration);
                socket.broadcast.to(room).emit('user:move', user.login, user.pos, duration);
                map[user.pos.x][user.pos.y].user = user.login;
            }

            function changeLocation(newLoc) {
                socket.broadcast.to(room).emit('user:gone', user.login);
                socket.leave(room);
                // get the position of door to previous location
                user.pos = extend({}, mapsSpec[newLoc].doors[room]);
                // change room and location
                room = newLoc;
                spawn();
            }

            if (!user.pos) {
                user.pos = {
                    x: 0,
                    y: 0
                };
            }
            if (!room) {
                room = 'grass';
            }
            if (!user.level) {
                user.level = 1;
                db.users.update({_id: user._id}, {$set: {level: 1}});
            }
            if (user.items === undefined) {
                user.items = [];
                db.users.update({_id: user._id}, {$set: {items: []}});
            }
            if (!user.maxItems) {
                user.maxItems = 10;
                db.users.update({_id: user._id}, {$set: {maxItems: user.maxItems}});
            }

            spawn();

            socket.emit('items', user.items);

            socket.on('move', function (pos) {
                var check = checkPos(map, pos.x, pos.y),
                    duration;
                if (!check) {
                    return;
                }
                map[user.pos.x][user.pos.y].user = '';
                duration = calcDuration(user.pos, pos);
                user.pos = pos;

                socket.emit('move', pos, duration);
                if (map[user.pos.x][user.pos.y].item) {
                    if (items[map[user.pos.x][user.pos.y].item].level < 0) {
                        user.level += items[map[user.pos.x][user.pos.y].item].level;
                        db.users.update({_id: user._id}, {$set: {level: user.level}});
                        socket.emit('level', user.level);
                        if (user.level <= 0) { // game over
                            user.level = 1;
                            user.items = [];
                            db.users.update({_id: user._id}, {$set: {
                                level: user.level,
                                items: user.items
                            }});
                            map[user.pos.x][user.pos.y].user = '';
                            socket.emit('level', user.level);
                            socket.emit('items', user.items);
                        }
                    } else if (user.items.length < user.maxItems) {
                        user.items.push(map[user.pos.x][user.pos.y].item);
                        db.users.update({_id: user._id}, {$set: {items: user.items}});
                    }
                    if (items[map[user.pos.x][user.pos.y].item].level < 0 || user.items.length < user.maxItems) {
                        socket.emit('item:found', map[user.pos.x][user.pos.y].item);
                        map[user.pos.x][user.pos.y].item = '';

                        itemPos.x = Math.floor(Math.random()*MAP_SIZE);
                        itemPos.y = Math.floor(Math.random()*MAP_SIZE);
                        if (map[itemPos.x][itemPos.y].item == '' && !map[itemPos.x][itemPos.y].door) {
                            itemName = items.names[Math.floor(Math.random()*NUMBER_ITEMS)];
                            map[itemPos.x][itemPos.y].item = itemName;
                        }
                    }
                }

                socket.broadcast.to(room).emit('user:move', user.login, pos, duration);
                if (check !== true) {
                    // move to door
                    setTimeout(changeLocation.bind(null, check), duration * 1000);
                    return;
                }
                map[pos.x][pos.y].user = user.login;
                db.users.update({_id: user._id}, {$set: {pos: user.pos}});
            });

            socket.on('duel:proposition', function (pos, opponent) {
                io.sockets.clients().some(function (client) {
                    if (client.session.user === map[pos.x][pos.y].user) {
                        client.emit('duel:proposition', pos, opponent);
                    }
                });
                return true;
            });
            socket.on('duel:finish', function (opponent) {
                var winner, looser;
                db.users.findOne({login: opponent}, function (err, opponent) {
                    db.users.findOne({login: user.login}, function (err, receiver) {
                        if (opponent.level > receiver.level) { // person who offered
                            winner = opponent;
                            looser = receiver;
                        }
                        else {                                 // who has got the offer
                            winner = receiver;
                            looser = opponent;
                        }
                        console.log('**************************************'+winner.login);
                        winner.level += Math.ceil(looser.level/2);
                        db.users.update({_id: winner._id}, {$set: {level: winner.level}});
                        io.sockets.clients().some(function (client) {
                            if (client.session.user === winner.login) {
                                client.emit('level', winner.level);
                            }
                        });
                    });

                });
            });
            socket.on('duel:stop', function (user) {
                io.sockets.clients().some(function (client) {
                    if (client.session.user === user) {
                        client.emit('duel:stop');
                        return true;
                    }
                });
            });
            socket.on('item:activate', function (index) {
                if (!items[user.items[index]]) {
                    return;
                }
                user.level += items[user.items[index]].level;
                user.items.splice(index, 1);
                db.users.update({_id: user._id}, {$set: {
                    level: user.level,
                    items: user.items
                }});
                socket.emit('level', user.level);
            });
            socket.on('disconnect', function () {
                map[user.pos.x][user.pos.y].user = '';
                socket.broadcast.to(room).emit('user:gone', user.login);
            });
        });
    });
};
