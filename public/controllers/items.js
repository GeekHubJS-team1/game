define([
    'controllers/infoBoxes',
    'json!data/items.json'
], function (infoBoxes, itemsData) {
    function gotItem(item) {
        var $numLevel = $('.numLevel');
        if (itemsData[item].level > 0) {
            var $newItem = $('<li><img src=".././images/items/' + itemsData[item].file + '" alt="' + item + '"></li>');
            $('.items ul').append($newItem)
        }
        else {
            $numLevel.text(parseInt($numLevel.text()) + itemsData[item].level);
        }
        infoBoxes.findItem(itemsData[item].info);
    }

    return  {
        gotItem : gotItem
    };
});