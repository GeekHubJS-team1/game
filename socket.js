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

    socket.session = session;
    io.sockets.$emit('session:connection', socket);
  });

  return io;
};
