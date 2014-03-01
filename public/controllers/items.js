define([
    'controllers/infoBoxes',
    'services/player',
    'json!data/items.json'
], function (infoBoxes, player, itemsData) {
    function gotItem(item) {
        var $numLevel = $('.numLevel'),
            $numItems = $('.numItems');
        if (itemsData[item].level > 0) {
            var $newItem = $('<li><img src=".././images/items/' + itemsData[item].file + '" alt="' + item + '"></li>');
            $('.items ul').append($newItem);
            $numItems.text(parseInt($numItems.text())+1)
        }
        else {
            $numLevel.text(parseInt($numLevel.text()) + itemsData[item].level);
            if ($numLevel.text() <= 0) {
                infoBoxes.gameOver();
            }
        }
        infoBoxes.findItem(itemsData[item].info);

    }

    player.on('item', function (item) {
        if (item && $('.numItems').text() < 10) {
            gotItem(item);
            console.warn(item)
        }
    });

    return  {
        gotItem : gotItem
    };
});