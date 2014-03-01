define([
    'services/socket',
    'controllers/infoBoxes',
    'EventEmitter'
], function (socket, infoBoxes, EventEmitter) {
    var items = new EventEmitter(),
        itemsData = require('../data/items.json');
    items.on('item:got', function(item) {
        var $numLevel = $('.numLevel');
        if (item.level > 0) {
            var $newItem = $('<li><img src=".././images/items/' + itemsData[item].file + '" alt="' + item + '"></li>');
            $('.items ul').append($newItem)
        }
        else {
            $numLevel.text(parseInt($numLevel.text()) + itemsData[item].level);
        }
    });

    return items;
});