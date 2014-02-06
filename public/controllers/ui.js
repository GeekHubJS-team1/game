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
    $('.chatButton').on('click', function(event) {
        event.preventDefault();
        if (chat.visible) {
            chat.hide();
        } else {
            chat.show();
        }
    });
});
