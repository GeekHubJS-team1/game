/**
 * Created by User on 24.01.14.
 */
define(['jquery' ], function ($) {
    return {
        template: function() {
            var $box = $('<li class="message"><h3></h3><a href="#" class="close">close</a></li>');
            $box.find('a').on('click', function() {
                $(this).parent().fadeOut();
            });
            return $box;
        },
        gameOver: function () {
            var $infoBLock = $(this.template());
            $infoBLock.addClass('gameOver');
            $infoBLock.find('h3').html('<span>Game over</span> try again?');
            $infoBLock.find('h3').after('<ul><li class="again"><a href="#">Yes</a></li><li class="exit"><a href="#">No way</a></li></ul>');
            $infoBLock.fadeOut();
            $('ul.info').append($infoBLock);
            $infoBLock.fadeIn();
        },
        findItem: function (user, infoItem) {
            var $infoBLock = $(this.template());
            $infoBLock.addClass('findItem');
            $infoBLock.find('h3').html('<span>' + user + '</span> find an item');
            $infoBLock.find('h3').after('<p>' + infoItem + '</p>');
            $infoBLock.fadeOut();
            $('ul.info').append($infoBLock);
            $infoBLock.fadeIn();
        }
    }
});