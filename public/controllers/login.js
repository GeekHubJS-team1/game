define([
    'jquery',
    'services/socket'
], function ($, socket) {
    var $errorLogIn = $('p.error');

    socket.on('login:unauthorized', function () {
        socket.disconnect();
        $('.logIn').fadeIn();
        $('.logIn fieldset').fadeIn();
    });
    socket.on('login:success', function (user) {
        $('.logIn').fadeOut(1000);
        $('.user .name').text(user);
    });
    socket.on('login:playing', function () {
        socket.disconnect();
        $errorLogIn.text('You are already playing!');
        $errorLogIn.addClass('show');
    });

    $('#logIn').on('click', function (e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        var form = $(this).closest('form')[0];
        xhr.open('POST', '/login');
        xhr.send(new FormData(form));
        xhr.addEventListener('load', function () {
            var data = this.responseText;
            if (data === 'ok') {
                socket.socket.connect();
            } else {
                $errorLogIn.text(data);
                $errorLogIn.addClass('show');
            }
        });
    });
});
