/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 24.12.13
 * Time: 22:07
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var $slider = $('.items ul'),
        sliderVisible = 6,
        sliderItems = $slider.find('li').size();
//  Info boxes
    setTimeout(GameOver, 2000);
    setTimeout(findItem, 3000);
    $('.message .close').on('click', function() {
        $(this).parent().fadeOut();
    });
    var $gameOverBlock = $('.gameOver');
    function GameOver() {
        $gameOverBlock.fadeIn();
//        setTimeout($gameOverBlock.fadeOut(), 5000)
    }

    var $findItemBlock = $('.findItem');
    function findItem() {
        $findItemBlock.fadeIn();
//        setTimeout($gameOverBlock.fadeOut(), 5000)
    }


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

//    Chat block move
    var $chatBlock = $('.chat'), width = $chatBlock.width();
    $('.chatButton').on('click', function() {
        if (parseInt($chatBlock.css('right')) === 0) {
            $chatBlock.css({'right' : -width+'px'});
        }
        else {
            $chatBlock.css({'right' : '0px'});
        }
    });
    $chatBlock.find('.close').on('click', function() {
        $chatBlock = $(this).parent();
        if (parseInt($chatBlock.css('right')) === 0) {
            $chatBlock.css({'right' : -width+'px'});
        }
    });
//    Chat scrollbar
    $('.chat ul').slimScroll({
        alwaysVisible: false,
        railVisible: true
    });
});
