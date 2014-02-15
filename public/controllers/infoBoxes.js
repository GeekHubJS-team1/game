/**
 * Created by User on 24.01.14.
 */
define([
    'jquery',
    'text!templates/infoBox.html'
], function ($, infoTpl) {
    return {
        template: function() {
            var $infoBoxTemplate = $(infoTpl);
            $infoBoxTemplate.find('a').on('click', function() {
                $(this).parent().fadeOut();
                $(this).parent().remove();
            });
            return $infoBoxTemplate;
        },
        gameOver: function () {
            var $infoBlock = this.template();
            $infoBlock.addClass('gameOver');
            $infoBlock.find('h3').html('<span>Game over</span> try again?');
            $infoBlock.find('h3').after('<ul><li class="again"><a href="#">Yes</a></li><li class="exit"><a href="#">No way</a></li></ul>');
            $infoBlock.fadeOut();
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
        },
        findItem: function (user, infoItem) {
            var $infoBlock = this.template();
            $infoBlock.addClass('findItem');
            $infoBlock.find('h3').html('<span></span> find an item');
            $infoBlock.find('h3 span').text(user);
            $infoBlock.find('h3').after('<p>' + infoItem + '</p>');
            $infoBlock.fadeOut();
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
            setTimeout($infoBlock.remove.bind($infoBlock), 5000);
        },
        duel: function (user) {
            var $infoBlock = this.template();
            $infoBlock.addClass('duelInfo');
            $infoBlock.find('h3').html('<span></span> offers you a duel');
            $infoBlock.find('h3 span').text(user);
            $infoBlock.find('h3').after('<ul><li class="yes"><a href="#">Yes</a></li><li class="no"><a href="#">No way</a></li></ul>');
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
        }
    }
});