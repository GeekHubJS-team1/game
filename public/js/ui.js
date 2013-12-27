/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 24.12.13
 * Time: 22:07
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var $slider = $('.items ul'), marginSlider, sliderVisible = 6;
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


//  Slider buttons

    $('.items .control').on('click', function() {
//        move slider to the left side
        if ($(this).hasClass('right')) {
            if (!$(this).hasClass('controlDisable')) {
                marginSlider = parseInt($slider.css('margin-left'));
                $slider.css({'margin-left': marginSlider-39+"px"});
            }
//        disable right button when the we've seen all items
            if (marginSlider === -($slider.find('li').size()-sliderVisible-1)*39) {
                $(this).addClass('controlDisable')
            }
//        enable left button when it possible ))
            if ($('.items .left').hasClass('controlDisable')) {
                $('.items .left').removeClass('controlDisable');
            }
        }
        else {
//        move slider to the right side
            if (!$(this).hasClass('controlDisable')) {
                marginSlider = parseInt($slider.css('margin-left'));
                $slider.css({'margin-left': marginSlider+39+"px"});
            }
//        disable right button when the we've seen all items
            if (marginSlider === -39) {
                $(this).addClass('controlDisable')
            }
//        enable right button when it possible ))
            if ($('.items .right').hasClass('controlDisable')) {
                $('.items .right').removeClass('controlDisable');
            }
        }
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
