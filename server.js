var express = require('express');
var http = require('http');
var connect = require('express/node_modules/connect');
var stylus = require('stylus');
var join = require("path").join;
var db = require('./lib/db');

var app = express();
var cookieParser = express.cookieParser('secret');
var sessionStore = new connect.middleware.session.MemoryStore();

var publicDir = join(__dirname, "public");

app.configure('development',function () {
    app.use(stylus.middleware({
        src: publicDir + '/styles',
        dest: publicDir
    }));
});

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(cookieParser);
    app.use(express.session({ store: sessionStore }));
    app.use(express.static(publicDir, { maxAge: 86400000 }));
});

app.post('/login', function (req, res) {
    var login = req.body.username;
    var pass = req.body.password;
    if (!login || !pass) {
        return res.send('Send login and password');
    }
    db.users.some(function (user) {
        if (user.login !== login) return false;
        login = undefined; // we found login and don`t need to add it to db
        if (user.pass !== pass) {
            res.send('Wrong password');
        } else {
            req.session.user = user.login;
            res.send('ok');
        }
        return true;
    });
    if (!login) return;
    // add user to db
    db.users.push({
        login: login,
        pass: pass
    });
    req.session.user = login;
    res.send('ok');
});
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

var server = http.createServer(app);

var io = require('./lib/socket')(server, cookieParser, sessionStore);

require('./lib/chat')(app, io);

server.listen(8000, function () {
    console.log('Server listening on port ' + 8000);
});
