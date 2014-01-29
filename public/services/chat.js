define([
    'services/socket',
    'EventEmitter'
], function (socket, EventEmitter) {
    var chat = new EventEmitter();

    chat.send = function (message) {
        socket.emit('chat', message);
    };

    socket.on('chat', function (msg) {
        chat.emit('receive', msg);
    });

    socket.on('user:in', function (user) {
        chat.emit('receive', {
            user: user,
            state: 'JOINED!'
        });
    });

    socket.on('user:out', function (user) {
        chat.emit('receive', {
            user: user,
            state: 'LEFT :('
        });
    });

    return chat;
});
