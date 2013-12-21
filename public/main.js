(function () {
  var loginDiv = document.querySelector('#login');
  var mainDiv = document.querySelector('#main');
  function showLoginForm() {
    var form = loginDiv.querySelector('form');

    loginDiv.style.display = 'block';
    mainDiv.style.display = 'none';

    loginDiv.querySelector('button').addEventListener('click', function (e) {
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login');
      xhr.send(new FormData(form));
      xhr.addEventListener('load', function () {
        var data = this.responseText;
        if (data === 'ok') {
          location.href = '/';
        } else {
          loginDiv.querySelector('span').textContent = data;
        }
      });
    });
  }

  function showChat(user) {
    mainDiv.querySelector('h2').textContent += user + '!';
  }

  function sendMessage() {
    var input = document.querySelector('#main input');
    socket.emit('chat', input.value);
    input.value = '';
  }

  function receiveMessage(user, message) {
    var chat = document.querySelector('#chat');
    var msgDiv = document.createElement('div');

    if (message === 'in') {
      msgDiv.innerHTML = '<b>' + user + ' JOINED!</b>';
    } else if (message === 'out') {
      msgDiv.innerHTML = '<b>' + user + ' LEFT :(</b>';
    } else {
      msgDiv.innerHTML = '<b>' + user + '</b> : ' + message;
    }
    chat.appendChild(msgDiv);
  }

  var socket = io.connect();

  socket.on('login:unauthorized', function () {
    showLoginForm();
  });
  socket.on('login:success', function (user) {
    showChat(user);
  });
  socket.on('chat', function (msg) {
    receiveMessage(msg.user, msg.message);
  });
  socket.on('user:in', function (user) {
    receiveMessage(user, 'in');
  });
  socket.on('user:out', function (user) {
    receiveMessage(user, 'out');
  });

  document.querySelector('#main button').addEventListener('click', sendMessage);
  document.querySelector('#main input').addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
      sendMessage();
    }
  });
}());
