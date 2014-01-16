define([
    'services/socket'
], function (socket) {
    var chat = {
        send: function (message) {
            socket.emit('chat', message);
        },
        onreceive: null
    };

    socket.on('chat', function (msg) {
        if (chat.onreceive) chat.onreceive(msg);
    });
    socket.on('user:in', function (user) {
        if (chat.onreceive) chat.onreceive({
            user: user,
            state: 'JOINED!'
        });
    });
    socket.on('user:out', function (user) {
        if (chat.onreceive) chat.onreceive({
            user: user,
            state: 'LEFT :('
        });
    });

    return chat;
});
