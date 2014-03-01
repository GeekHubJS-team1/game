define([
    'jquery',
    'kinetic',
    'services/duel',
    'services/player',
    'json!data/sprites.json',
    'services/infoMap',
    'controllers/infoBoxes'
], function ($, Kinetic, Duel, player, sprites, infoMap, infoBoxes) {
    var SQUARE = 128,
        MAP_SIZE = 25,
        SPAWN = .1,
        $GAME_AREA = $('#game-area'),
        keyMove = false,
        userLayer, image, moving,
        // to prevent error when image is not loaded
        sprite = {setAnimation: function () {}},
        // empty tweens
        playerTween, stageTween = playerTween = {finish: function () {}},
        duel = {
            offerProgress: 0,
            opponent: {
              x: '',
              y: '',
              name: ''
            },
            MyDuelPosition: {
              x: '',
              y: ''
            },
            me: ''
        },
        newX, newY,
        pos = {x: 0, y: 0};

    function moveTo(x, y, duration) {
        console.log('new position', x, y);
        if (x > pos.x) {
            sprite.setAnimation('right');
        } else if (x < pos.x) {
            sprite.setAnimation('left');
        } else if (y < pos.y) {
            sprite.setAnimation('up');
        } else {
            sprite.setAnimation('idle');
        }
        moving = true;
        playerTween = new Kinetic.Tween({
            node: userLayer,
            duration: duration,
            x: x * SQUARE,
            y: y * SQUARE,
            onFinish: function () {
                if (keyMove === false) {
                    sprite.setAnimation('idle');
                }
                moving = false;
            }
        });
        playerTween.play();
        pos.x = x;
        pos.y = y;
        moveStage(duration);

        if ((Math.abs(pos.x - duel.opponent.x) * SQUARE > window.innerWidth ||
            Math.abs(pos.y - duel.opponent.y) * SQUARE > window.innerHeight) && duel.offerProgress != 0) {
            duel.offerProgress = 0;
            $('p.duelInfo').fadeOut();
        }
        if ((Math.abs(pos.x - duel.MyDuelPosition.x) * SQUARE > window.innerWidth ||
            Math.abs(pos.y - duel.MyDuelPosition.y) * SQUARE > window.innerHeight) &&
            duel.MyDuelPosition.x != '' && duel.MyDuelPosition.y != '') {
            $('li.duelInfo').remove();
            duel.MyDuelPosition.x =  duel.MyDuelPosition.y = '';
            Duel.stop(duel.opponent.name);
        }
    }

    function moveStage(duration) {
        var stage = userLayer.parent,
            stagePos = stage.getPosition();
        if (duration === SPAWN) {
            stage.x = -(pos.x + .5) * SQUARE + window.innerWidth / 2;
            stage.y = -(pos.y + .5) * SQUARE + window.innerHeight / 2;
            stage.setPosition(stage.x, stage.y);
            stage.draw();
            return;
        }
        if (((pos.x - 1) * SQUARE + stage.x) < 0) {
            stage.x = -(pos.x - 1) * SQUARE;
        } else if (((pos.x + 2) * SQUARE + stage.x) > window.innerWidth) {
            stage.x = -(pos.x + 2) * SQUARE + window.innerWidth;
        }
        if (((pos.y - 1) * SQUARE + stage.y) < 0) {
            stage.y = -(pos.y - 1) * SQUARE;
        } else if (((pos.y + 2) * SQUARE + stage.y) > window.innerHeight) {
            stage.y = -(pos.y + 2) * SQUARE + window.innerHeight;
        }
        stage.x = Math.floor(stage.x);
        stage.y = Math.floor(stage.y);

        if (stagePos.x != stage.x || stagePos.y != stage.y) {
            stageTween = new Kinetic.Tween({
                node: userLayer.parent,
                duration: duration,
                x: stage.x,
                y: stage.y
            });
            stageTween.play();
        }
    }

    userLayer = new Kinetic.Layer({
        x: 0,
        y: 0,
        width: SQUARE,
        height: SQUARE
    });

    player.on('spawn', function (newPos, userLogin) {
        userLayer.removeChildren();

        duel.me = userLogin;

        var rect = new Kinetic.Rect({
            x: 0,
            y: -27,
            fill: '#004047',
            opacity: 0.5,
            width: SQUARE,
            height: 25,
            cornerRadius: 5
        });
        var userName = new Kinetic.Text({
            x: 0,
            y: -20,
            width: SQUARE,
            text: userLogin,
            align: 'center',
            fontSize: 12,
            fontFamily: 'PressStart2P',
            fill: '#8ad3d6'
        });

        userLayer.add(rect);
        userLayer.add(userName);

        pos = newPos;
        // stop tweens
        playerTween.finish();
        stageTween.finish();
        userLayer.setPosition(pos.x * SQUARE, pos.y * SQUARE);
        moveStage(SPAWN);
        userLayer.draw();

        image = new Image();
        image.onload = function () {
            sprite = new Kinetic.Sprite({
                x: 0,
                y: 0,
                image: image,
                frameRate: 1,
                animation: 'idle',
                animations: sprites.geek.animations
            });
            userLayer.add(sprite);
            userLayer.draw();
        };
        image.src = 'images/users/' + sprites.geek.file;
    });

    player.on('move', function (pos, duration) {
        moveTo(pos.x, pos.y, duration);
    });

    player.on('level', function (level) {
        $('.numLevel').text(level);
    });

    Duel.on('duel:proposition', function (position, opponent) {
        infoBoxes.duel(opponent);
        duel.MyDuelPosition = position;
        duel.opponent.name = opponent;
        $('.js-stop-duel, .js-close-window').on('click', function (e) {
            e.preventDefault();
            duel.MyDuelPosition.x =  duel.MyDuelPosition.y = '';
            Duel.stop(duel.opponent.name);
        });
    });
    Duel.on('duel:stop', function () {
        duel.offerProgress = 0;
    });

    $GAME_AREA.on('click', function (e) {
        var $textMess = $('#textMessage');
        if ($textMess.is( ":focus" )) {
            $textMess.blur();
        }
        var stagePos = userLayer.parent.getPosition();
        if (moving) {
            return;
        }
        newX = Math.floor((e.clientX - stagePos.x) / SQUARE);
        newY = Math.floor((e.clientY - stagePos.y) / SQUARE);
        player.move(newX, newY);
    });
    $GAME_AREA.on('dblclick', function (e) {
        if (infoMap.map[newX][newY] != '' && duel.offerProgress === 0) {
            $('p.duelInfo').fadeIn();
            duel.offerProgress++;
            duel.opponent.x = newX;
            duel.opponent.y = newY;
        }
    });

    $(document).on('keydown', function (e) {
        if (moving || $('#textMessage').is(":focus")) {
            return;
        }
        if (e.keyCode === 32 && duel.offerProgress === 1) {
            if (Math.abs(pos.x -  duel.opponent.x) + Math.abs(pos.y -  duel.opponent.y) <= 2) {
                Duel.proposition(duel.opponent, duel.me);
                $('p.duelInfo').fadeOut();
                duel.offerProgress++;
            }
        }
        if (e.keyCode === 27 && duel.offerProgress === 1) {
                $('p.duelInfo').fadeOut();
                duel.offerProgress = 0;
        }
        if (e.keyCode === 37 || e.keyCode === 65) {
            player.move(pos.x - 1, pos.y);
            keyMove = true;
        }
        else if (e.keyCode === 39 || e.keyCode === 68) {
            player.move(pos.x + 1, pos.y);
            keyMove = true;
        }
        else if (e.keyCode === 38 || e.keyCode === 87) {
            player.move(pos.x, pos.y - 1);
            keyMove = true;
        }
        else if (e.keyCode === 40 || e.keyCode === 83) {
            player.move(pos.x, pos.y + 1);
            keyMove = true;
        }
    });
    $(document).on('keyup', function (e) {
        if ([37, 65, 39, 68, 38, 87, 40, 83].indexOf(e.keyCode) > -1) {
            keyMove = false;
            if (!moving) {
                sprite.setAnimation('idle');
            }
        }
    });

    return userLayer;
});
