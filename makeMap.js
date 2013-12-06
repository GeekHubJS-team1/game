var fs = require('fs'),
    PNG = require('pngjs').PNG;

function rgb(red, green, blue) {
    var decColor = 0x1000000 + blue + 0x100 * green + 0x10000 * red ;
    return '#'+decColor.toString(16).substr(1);
}
var map = [];
var types = {
  "#008000": 'grass',
  "#ffff00": 'sand',
  "#000080": 'water'
};
fs.createReadStream('map.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
        for (var x = 0; x < this.width; x++) {
            map[x] = [];
            for (var y = 0; y < this.height; y++) {
                var idx = (this.width * y + x) << 2;
                var color = rgb(this.data[idx], this.data[idx+1], this.data[idx+2]);
                map[x][y] = types[color];
            }
        }
        fs.writeFile('map.json', JSON.stringify(map), function (err) {
            if (err) return console.log(err);
        });
    });
