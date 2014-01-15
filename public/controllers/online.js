define([
    'jquery',
    'services/socket'
], function ($, socket) {

    socket.on('online', function (count) {
        $('.numOnline').text(count);
    });
});
