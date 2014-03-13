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
            this.closeWindow($infoBoxTemplate);
            return $infoBoxTemplate;
        },
        closeWindow: function (infoBox) {
            infoBox.find('.js-close-window').on('click', function(e) {
                if (!infoBox.hasClass('gameOver')) {
                    e.preventDefault();
                }
                var $window  = $(this).parents('.message');
                $window.fadeOut(function() {
                    $window.remove();
                });
            });
        },
        gameOver: function () {
            var $infoBlock = this.template();
            $infoBlock.addClass('gameOver');
            $infoBlock.find('h3').html('<span>Game over</span> try again?');
            $infoBlock.find('h3').after('<ul><li class="again"><a href="#">Yes</a></li><li class="exit"><a href="/logout" class="js-close-window">No way</a></li></ul>');
            $infoBlock.fadeOut();
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
            this.closeWindow($infoBlock);
            $infoBlock.find('.again a').on('click', function () {
                $infoBlock.fadeOut(function() {
                    $infoBlock.remove();
                });
            });
        },
        findItem: function (infoItem) {
            var $infoBlock = this.template();
            $infoBlock.addClass('findItem');
            $infoBlock.find('h3').html('<span>You</span> find an item');
            $infoBlock.find('h3').after('<p>' + infoItem + '</p>');
            $infoBlock.fadeOut();
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
            setTimeout($infoBlock.remove.bind($infoBlock), 6000);
        },
        duel: function (user) {
            var $infoBlock = this.template();
            $infoBlock.addClass('duelInfo');
            $infoBlock.find('h3').html('<span></span> offers you a duel');
            $infoBlock.find('h3 span').text(user);
            $infoBlock.find('h3').after('<ul><li class="yes"><a href="#">Yes</a></li><li class="no"><a href="#" class="js-close-window js-stop-duel">No way</a></li></ul>');
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
            this.closeWindow($infoBlock);
        },
        duelWon: function (user, level) {
            var $infoBlock = this.template();
            $infoBlock.addClass('duelInfo');
            $infoBlock.find('h3').html('You won duel with <span></span>');
            $infoBlock.find('h3 span').text(user);
            $infoBlock.find('h3').after('<p>you got +<span></span> level</p>');
            $infoBlock.find('p span').text(level);
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
            setTimeout($infoBlock.remove.bind($infoBlock), 6000);
        },
        duelLost: function (user) {
            var $infoBlock = this.template();
            $infoBlock.addClass('duelInfo');
            $infoBlock.find('h3').html('You lost duel with <span></span>');
            $infoBlock.find('h3 span').text(user);
            $('ul.info').append($infoBlock);
            $infoBlock.fadeIn();
            setTimeout($infoBlock.remove.bind($infoBlock), 6000);
        }
    }
});