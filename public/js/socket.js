(function () {
    var $errorField = $('p.error'),
        chatTpl = '<h3><span class="user"></span> ' +
            '<span class="state"></span></h3><span class="date"></span><p></p>';

    function sendMessage(e) {
        e.preventDefault();
        var $textarea = $('.chat textarea');
        var text = $textarea.val();
        if (text != '') {
            socket.emit('chat', text);
            $textarea.val('');
            $textarea.parent().parent().find('.error').fadeOut();
        }
        else {
            $textarea.parent().parent().find('.error').fadeIn();
        }
    }

    function receiveMessage(msg) {
        var $listMessage = $('.chat ul'),
            $item = $('<li>').html(chatTpl),
            time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        $item.find('.user').text(msg.user);
        if (msg.user === 'me') {
            $item.find('.user').addClass('me');
        }
        $item.find('.state').text(msg.state);
        $item.find('.date').text(time);
        $item.find('p').text(msg.message);
        $listMessage.append($item);
        // scroll to the new message
        $listMessage.scrollTop($listMessage.prop('scrollHeight'));
    }

    var socket = io.connect();

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
        $errorField.text('You are already playing!');
        $errorField.addClass('show');
    });
    socket.on('chat', function (msg) {
        receiveMessage(msg);
    });
    socket.on('user:in', function (user) {
        receiveMessage({
            user: user,
            state: 'JOINED!'
        });
    });
    socket.on('user:out', function (user) {
        receiveMessage({
            user: user,
            state: 'LEFT :('
        });
    });
    socket.on('online', function (count) {
        $('.numOnline').text(count);
    });

    $('.chat input[type=submit]').on('click', sendMessage);
    $('.chat textarea').on('keydown', function (e) {
        if (e.which == 13 && ! e.shiftKey) {
            sendMessage(e);
            return false;
        }
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
                $errorField.text(data);
                $errorField.addClass('show');
            }
        });
    });
}());
