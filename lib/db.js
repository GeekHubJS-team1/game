exports.users = [];

var i, j, map = [];
for (i = 0; i < 25; i++) {
    map[i] = new Array(25);
    for (j = 0; j < 25; j++) {
        map[i][j] = {
            item: '',
            user: ''
        };
    }
}

exports.map = map;
