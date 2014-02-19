var Db = require('mongodb').Db,
    Server = require('mongodb').Server;

var db = new Db('game4geeks', new Server('127.0.0.1', 27017));
db.open(function(err, db) {
    if(err) throw err;

    var usersCollection = db.collection('users');
    exports.users.find = usersCollection.findOne.bind(usersCollection);
    exports.users.insert = usersCollection.insert.bind(usersCollection);
    exports.users.update = usersCollection.update.bind(usersCollection);
});
exports.db = db;
exports.users = {};
