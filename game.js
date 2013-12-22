module.exports = function(app) {
  var io = app.get('io');

  io.sockets.on('session:connection', function (socket) {
    var session = socket.session;

    socket.broadcast.emit('user:in', session.user);
    socket.on('disconnect', function () {
      socket.broadcast.emit('user:out', session.user);
    });

    socket.on('chat', function (message) {
      socket.broadcast.emit('chat', {user: session.user, message: message});
      socket.emit('chat', {user: 'me', message: message});
    });
  });
}
