define([
    'jquery',
    'controllers/infoBoxes',
    'services/player',
    'services/infoMap',
    'json!data/items.json'
], function ($, infoBoxes, player, infoMap, itemsData) {
    var $slider = $('.items ul'),
        $numLevel = $('.numLevel'),
        $numItems = $('.numItems'),
        sliderVisible = 6,
        offset = 0,
        numItems = 0;

    function gameOver () {

    }

    /**
     * Add item to slider and show message
     */
    function gotItem(item, found) {
        var img = '<img src="/images/items/' + itemsData[item].file + '" alt="' + item + '">';
        if (itemsData[item].level > 0) {
            var $newItem = $('<li>' + img + '</li>');
            $('.items ul').append($newItem);
            $numItems.text(++numItems);
            toggleArrows();
        }
        found && infoBoxes.findItem(img+'level: '+itemsData[item].level);
    }

    /**
     * change disabled state of arrow buttons
     */
    function toggleArrows() {
        $('.items .left').toggleClass('controlDisable', offset >= 0);
        $('.items .right').toggleClass('controlDisable', sliderVisible >= numItems + offset);
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
        toggleArrows();
        // apply slider offset
        $slider.css({'margin-left': offset * 39 + "px"});
    });

    $('.items').on('click', 'li', function () {
        var $this = $(this);
        player.activateItem($this.index());
        $this.remove();
        if ($numItems.text() > 0) {
            $numItems.text(--numItems);
        }
        toggleArrows();
    });

    player.on('item', function (item) {
        gotItem(item, true);
    });

    player.on('items', function (items) {
        offset = numItems = 0;
        $('.items .control').addClass('controlDisable');
        $slider.css({'margin-left': 0});
        $slider.empty();

        items.forEach(function (item) {
            gotItem(item);
        });
        $numItems.text(numItems);
    });

    player.on('level', function (level) {
        if (level <= 0) {
            var gameOver = true;
            infoBoxes.gameOver();
            $('.gameOver .again a').on('click', function () {
                var x, y;
                while (gameOver) {
                    x = Math.floor(Math.random()*26);
                    y = Math.floor(Math.random()*26);
                    if (infoMap.map[x][y] == '') {
                        player.move(Math.floor(Math.random()*26), Math.floor(Math.random()*26));
                        gameOver = false;
                    }
                }
            });
        }
    });

    return  {
        gotItem : gotItem
    };
});