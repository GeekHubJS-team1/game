define([
    'jquery',
    'services/socket',
    'text!templates/chat-msg.html'
], function ($, socket, chatTpl) {
    var $chatBlock = $('.chat'),
        $textarea = $('.chat textarea'),
        $listMessage = $chatBlock.find('ul');

    function sendMessage(e) {
        e.preventDefault();
        var text = $textarea.val().trim();
        if (text != '') {
            socket.emit('chat', text);
            $textarea.val('');
            $chatBlock.find('.error').fadeOut();
        }
        else {
            $chatBlock.find('.error').fadeIn();
        }
    }

    function receiveMessage(msg) {
        var $item = $('<li>').html(chatTpl),
            time = new Date().toTimeString().replace(/\s.*$/, '');
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

    $chatBlock.find('input[type=submit]').on('click', sendMessage);
    $textarea.on('keydown', function (e) {
        if (e.which == 13 && !e.shiftKey) {
            sendMessage(e);
            return false;
        }
    });
});
