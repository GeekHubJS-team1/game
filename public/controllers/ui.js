define([
    'jquery',
    'controllers/chat',
    'controllers/infoBoxes',
    'controllers/items'
], function($, chat) {
    // Chat block show/hide
    $('.chatButton').on('click', function(event) {
        event.preventDefault();
        if (chat.visible) {
            chat.hide();
        } else {
            chat.show();
            $('.newMessage').fadeOut();
        }
    });
});
