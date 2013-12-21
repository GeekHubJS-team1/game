module.exports = function(server, cookieParser, sessionStore) {
  var io = require('socket.io').listen(server);
  var SessionSockets = require('session.socket.io');
  var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

  sessionSockets.on('connection', function (err, socket, session) {
    if (err || !session.user) {
      socket.emit('login:unauthorized');
      socket.disconnect();
      return;
    } else {
      socket.emit('login:success', session.user);
    }

    socket.on('chat', function (message) {
      socket.broadcast.emit('chat', {user: session.user, message: message});
      socket.emit('chat', {user: 'me', message: message});
    });
    socket.broadcast.emit('user:in', session.user);
    socket.on('disconnect', function () {
      socket.broadcast.emit('user:out', session.user);
    });
  });
  return io;
};
