var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/game4geeks', function(err, db) {
    if(err) throw err;

    var usersCollection = db.collection('users');
    exports.users.find = function (query, cb) {
        usersCollection.findOne(query, cb);
    };
    exports.users.insert = usersCollection.insert.bind(usersCollection);
    exports.users.update = usersCollection.update.bind(usersCollection);
});
exports.users = {};
