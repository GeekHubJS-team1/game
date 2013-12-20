var express = require('express');
var http = require('http');
var connect = require('express/node_modules/connect');
var join = require("path").join;
var db = require('./db');

var app = express();
var cookieParser = express.cookieParser('secret');
var sessionStore = new connect.middleware.session.MemoryStore();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use(express.session({ store: sessionStore }));
  app.use(express.static(join(__dirname, "public"), { maxAge: 86400000 }));
});

app.post('/login', function (req, res) {
  var login = req.body.login;
  var pass = req.body.pass;
  if (!login || !pass) {
    return res.send('Send login and password');
  }
  db.users.some(function (user){
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

var server = http.createServer(app).listen(8000);

var io = require('./socket')(server, cookieParser, sessionStore);
app.set('io', io);
