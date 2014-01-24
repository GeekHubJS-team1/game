define(['jquery', 'controllers/chat', 'controllers/infoBoxes'], function($, chat, info) {
    var $slider = $('.items ul'),
        sliderVisible = 6,
        sliderItems = $slider.find('li').size();
//  Info boxes
    $('.message .close').on('click', function() {
        $(this).parent().fadeOut();
    });
    info.gameOver();
    info.findItem('User', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed');
//    setTimeout(GameOver, 2000);
//    setTimeout(findItem, 3000);
//    var $gameOverBlock = $('.gameOver');
//    function GameOver() {
//        $gameOverBlock.fadeIn();
////        setTimeout($gameOverBlock.fadeOut(), 5000)
//    }
//
//    var $findItemBlock = $('.findItem');
//    function findItem() {
//        $findItemBlock.fadeIn();
////        setTimeout($gameOverBlock.fadeOut(), 5000)
//    }

    // Slider buttons
    $('.items .control').on('click', function(event) {
        var $this = $(this),
            offset = $slider.data('offset') || 0;

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
        $('.items .right').toggleClass('controlDisable', !(sliderVisible - sliderItems - offset));

        // apply slider offset
        $slider.css({'margin-left': offset*39+"px"});
        $slider.data('offset', offset);
    });

    // Chat block show/hide
    $('.chatButton').on('click', function() {
        if (chat.visible) {
            chat.hide();
        } else {
            chat.show();
        }
    });
});
