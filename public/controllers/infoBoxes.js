/**
 * Created by User on 24.01.14.
 */
define(['jquery', 'text!templates/infoBox.html' ], function ($, infoTpl) {
    return {
        template: function() {
            var $infoBoxTemplate = $(infoTpl);
            $infoBoxTemplate.find('a').on('click', function() {
                $(this).parent().fadeOut();
            });
            return $infoBoxTemplate;
        },
        gameOver: function () {
            var $infoBox = $(this.template());
            $infoBox.addClass('gameOver');
            $infoBox.find('h3').html('<span>Game over</span> try again?');
            $infoBox.find('h3').after('<ul><li class="again"><a href="#">Yes</a></li><li class="exit"><a href="#">No way</a></li></ul>');
            $infoBox.fadeOut();
            $('ul.info').append($infoBox);
            $infoBox.fadeIn();
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