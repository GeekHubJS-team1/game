module.exports = function(server, cookieParser, sessionStore) {
  var io = require('socket.io').listen(server);
  var SessionSockets = require('session.socket.io');
  var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

  sessionSockets.on('connection', function (err, socket, session) {
    if ('user' in session) {
      socket.emit('login:success', session.user);
    } else {
      socket.emit('login:unauthorized');
      socket.disconnect();
    }
    socket.on('chat', function (message) {
      socket.broadcast.emit('chat', {user: session.user, message: message});
      socket.emit('chat', {user: 'me', message: message});
    });
  });
  return io;
};
