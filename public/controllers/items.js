define([
    'jquery',
    'controllers/infoBoxes',
    'services/player',
    'json!data/items.json'
], function ($, infoBoxes, player, itemsData) {
    var $slider = $('.items ul'),
        $numLevel = $('.numLevel'),
        $numItems = $('.numItems'),
        sliderVisible = 6,
        offset = 0,
        numItems = 0;

    /**
     * Add item to slider and show message
     */
    function gotItem(item) {
        var img = '<img src="/images/items/' + itemsData[item].file + '" alt="' + item + '">';
        if (itemsData[item].level > 0) {
            var $newItem = $('<li>' + img + '</li>');
            $('.items ul').append($newItem);
            numItems++;
            if (!(sliderVisible - numItems - offset + 1)) {
                $('.items .control.right').removeClass('controlDisable');
            }
            $numItems.text(numItems);
        }
        infoBoxes.findItem(img);
    }
    // Slider buttons
    $('.items .control').on('click', function (event) {
        var $this = $(this);
        event.preventDefault();

        if ($this.hasClass('controlDisable')) {
            return;
        }
        if ($this.hasClass('right')) {
            offset--;
        } else {
            offset++;
        }
        // change disabled state of arrow buttons
        $('.items .left').toggleClass('controlDisable', !offset);
        $('.items .right').toggleClass('controlDisable', !(sliderVisible - numItems - offset));
        // apply slider offset
        $slider.css({'margin-left': offset * 39 + "px"});
        $slider.data('offset', offset);
    });

    player.on('item', function (item) {
        if (item && $('.numItems').text() < 10) {
            gotItem(item);
            console.warn(item)
        }
    });

    player.on('level', function (level) {
        if (level <= 0) {
            infoBoxes.gameOver();
        }
    });

    return  {
        gotItem : gotItem
    };
});