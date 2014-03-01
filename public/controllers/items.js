define([
    'controllers/infoBoxes',
    'json!data/items.json'
], function (infoBoxes, itemsData) {
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

    return  {
        gotItem : gotItem
    };
});