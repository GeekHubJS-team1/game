var cellSize = 64;
var tempMap = new Array([3,1,1,1,1,1,1,1,1,1],
        [1,2,1,3,1,1,3,1,1,1],
        [1,1,3,3,3,1,2,1,1,1],
        [1,1,3,1,2,1,2,2,1,1],
        [1,1,1,1,1,1,2,2,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]);

var stage = new Kinetic.Stage({
    container: 'game-area',
    width: window.innerWidth,
    height: window.innerHeight
});
var layer = new Kinetic.Layer({
    x: -cellSize,
    y: -cellSize
});

stage.add(layer);

var imageGrass = new Image(),
    imageSand = new Image(),
    imageWater = new Image();

imageWater.onload = function(){
    var cellGrass = new Kinetic.Image({
            width: cellSize,
            height: cellSize,
            image: imageGrass
        });
    var cellSand = new Kinetic.Image({
            width: cellSize,
            height: cellSize,
            image: imageSand
        });
    var cellWater = new Kinetic.Image({
            width: cellSize,
            height: cellSize,
            image: imageWater
        });

    for(var i = 1; i<=10; i++){
        for(var j = 1; j<=10; j++){
            var currentCell = tempMap[j-1][i-1];
            if (currentCell === 1){
                layer.add(cellGrass.clone({x: cellSize*i, y: cellSize*j}));
            }
            if (currentCell === 2){
                layer.add(cellSand.clone({x: cellSize*i, y: cellSize*j}));
            }
            if (currentCell === 3){
                layer.add(cellWater.clone({x: cellSize*i, y: cellSize*j}));
            }

        }
    }
    layer.draw();
};
imageGrass.src = 'img/grass.jpg';
imageSand.src = 'img/sand.jpg';
imageWater.src = 'img/water.jpg';

