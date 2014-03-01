define([
    'json!data/sprites.json'
], function (itemsData) {
    function gotItem(item) {
        var $numLevel = $('.numLevel');
        if (item.level > 0) {
            var $newItem = $('<li><img src=".././images/items/' + itemsData[item].file + '" alt="' + item + '"></li>');
            $('.items ul').append($newItem)
        }
        else {
            $numLevel.text(parseInt($numLevel.text()) + itemsData[item].level);
        }
    }

    return  {
        gotItem : gotItem
    };
});