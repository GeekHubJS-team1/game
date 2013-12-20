(function () {
  function showLoginForm() {
    var div = document.querySelector('#login');
    var form = div.querySelector('form');
    div.style.display = 'block';
    div.querySelector('button').addEventListener('click', function (e) {
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login');
      xhr.send(new FormData(form));
      xhr.addEventListener('load', function () {
        var data = this.responseText;
        if (data === 'ok') {
          location.href = '/';
        } else {
          div.querySelector('span').textContent = data;
        }
      });
    });
  }

  function showChat(user) {
    var div = document.querySelector('#main');
    div.style.display = 'block';
    div.querySelector('h2').textContent += user + '!';
  }

  var socket = io.connect('/');
  socket.on('login:unauthorized', function () {
    showLoginForm();
  });
  socket.on('login:success', function (user) {
    showChat(user);
  });
  socket.on('chat', function (msg) {
    var chat = document.querySelector('#chat');
    var message = document.createElement('div');
    message.innerHTML = '<b>' + msg.user + '</b> : ' + msg.message;
    chat.appendChild(message);
  });

  document.querySelector('#main button').addEventListener('click', function (e) {
    var input = document.querySelector('#main input');
    e.preventDefault();
    socket.emit('chat', input.value);
    input.value = '';
  });
}());
