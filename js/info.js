/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 24.12.13
 * Time: 22:07
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var $slider, marginSlider, sliderVisible = 6;
//  Info boxes
    setTimeout(GameOver, 2000);
    setTimeout(findItem, 3000);
    $('.message .close').on('click', function() {
        $(this).parent().fadeOut();
    });
    var $gameOverBlock;
    function GameOver() {
        $gameOverBlock =$('.gameOver');
        $gameOverBlock.fadeIn();
//        setTimeout($gameOverBlock.fadeOut(), 5000)
    }

    var $findItemBlock;
    function findItem() {
        $findItemBlock =$('.findItem');
        $findItemBlock.fadeIn();
//        setTimeout($gameOverBlock.fadeOut(), 5000)
    }


//    Slider buttons
    $('.items .right').on('click', function() {
//        move slider to the left side
        if (!$(this).hasClass('controlDisable')) {
            $slider = $(this).prev().find('ul');
            marginSlider = parseInt($slider.css('margin-left'));
            $slider.animate({'margin-left': marginSlider-39+"px"}, 200);
        }
//        disable right button when the we've seen all items
        if (marginSlider === -($slider.find('li').size()-sliderVisible-1)*39) {
            $(this).addClass('controlDisable')
        }
//        enable left button when it possible ))
        if ($('.items .left').hasClass('controlDisable')) {
            $('.items .left').removeClass('controlDisable');
        }
    });
    $('.items .left').on('click', function() {
//        move slider to the right side
        if (!$(this).hasClass('controlDisable')) {
            $slider = $(this).next().find('ul');
            marginSlider = parseInt($slider.css('margin-left'));
            $slider.animate({'margin-left': marginSlider+39+"px"}, 200);
        }
//        disable right button when the we've seen all items
        if (marginSlider === -39) {
            $(this).addClass('controlDisable')
        }
//        enable right button when it possible ))
        if ($('.items .right').hasClass('controlDisable')) {
            $('.items .right').removeClass('controlDisable');
        }
    });

//    Chat block move
    var $chatBlock;
    $('.chatButton').on('click', function() {
        $chatBlock = $('.chat');
        if (parseInt($chatBlock.css('right')) === 0) {
            $chatBlock.animate({'right' : '-300px'}, 500);
        }
        else {
            $chatBlock.animate({'right' : '0px'}, 500);
        }
    });
    $('.chat .close').on('click', function() {
        $chatBlock = $(this).parent();
        if (parseInt($chatBlock.css('right')) === 0) {
            $chatBlock.animate({'right' : '-300px'}, 500);
        }
    });
});