/**
 * Created by User on 24.01.14.
 */
var info = {
    that : this,
    template: '<li><h3></h3><a href="#" class="close">close</a></li>',
    gameOver: function () {
        var $infoBLock = info.template;
        $infoBLock.find('h3').html('<span>Game over</span> try again?');
        $infoBLock.find('h3').after('<ul><li class="again"><a href="#">Yes</a></li><li class="exit"><a href="#">No way</a></li></ul>');
        $infoBLock.fadeOut();
        $('ul.info').append($infoBLock);
        $infoBLock.fadeIn();
    },
    findItem : function(user, infoItem) {
        $infoBLock.find('h3').html('<span>' + user + '</span> find an item');
        $infoBLock.find('h3').after('<p>' + infoItem + '</p>');
        $infoBLock.fadeOut();
        $('ul.info').append($infoBLock);
        $infoBLock.fadeIn();
    }
};