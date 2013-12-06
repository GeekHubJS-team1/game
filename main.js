var request = new XMLHttpRequest();
request.open('GET', 'map.json');
request.addEventListener('load', function () {
  var x, y, row, color,
      data = JSON.parse(this.responseText);
  for(y=0; y < data[0].length; y++) {
    var tr = document.createElement('tr');
    for(x=0; x < data.length; x++) {
      var td = document.createElement('td');
      td.textContent = ' ';
      td.style.backgroundImage = 'url('+data[x][y]+'.jpg)';
      tr.appendChild(td);
    }
    document.querySelector('table').appendChild(tr);
  }
});
request.send();
