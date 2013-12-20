module.exports = function(server, cookieParser, sessionStore) {
  var io = require('socket.io').listen(server);
  var SessionSockets = require('session.socket.io');
  var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

  sessionSockets.on('connection', function (err, socket, session) {
    if (!session.user) {
      socket.emit('login:unauthorized');
      socket.disconnect();
    } else {
      socket.emit('login:success', session.user);
    }
    socket.on('chat', function (message) {
      socket.broadcast.emit('chat', {user: session.user, message: message});
      socket.emit('chat', {user: 'me', message: message});
    });
  });
  return io;
};
