(function () {
  var chatTpl = '<h3><span class="user"></span> ' +
    '<span class="state"></span></h3><span class="date"></span><p></p>';

  function sendMessage(e) {
    e.preventDefault();
    var $textarea = $('.chat textarea');
    var text = $textarea.val();
    socket.emit('chat', text);
    $textarea.val('');
  }

  function receiveMessage(msg) {
    var $item = $('<li>').html(chatTpl);
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    $item.find('.user').text(msg.user);
    if (msg.user === 'me') {
      $item.find('.user').addClass('me');
    }
    $item.find('.state').text(msg.state);
    $item.find('.date').text(time);
    $item.find('p').text(msg.message);
    $('.chat ul').append($item);
  }

  var socket = io.connect();

  socket.on('login:unauthorized', function () {
    $('.logIn fieldset').fadeIn();
  });
  socket.on('login:success', function (user) {
    $('.logIn').fadeOut(1000);
    $('.user .name').text(user);
  });
  socket.on('chat', function (msg) {
    receiveMessage(msg);
  });
  socket.on('user:in', function (user) {
    receiveMessage({
      user: user,
      state: 'JOINED!'
    });
  });
  socket.on('user:out', function (user) {
    receiveMessage({
      user: user,
      state: 'LEFT :('
    });
  });
  socket.on('online', function (count) {
    $('.numOnline').text(count);
  });

  $('.chat input[type=sunmit]').on('click', sendMessage);
  $('.chat textarea').on('keyup', function(e) {
    if (e.keyCode == 13) {
      sendMessage(e);
    }
  });
  $('#logIn').on('click', function (e) {
    var $errorField = $('p.error');
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var form = $(this).closest('form')[0];
    xhr.open('POST', '/login');
    xhr.send(new FormData(form));
    xhr.addEventListener('load', function () {
      var data = this.responseText;
      if (data === 'ok') {
        socket.disconnect();
        socket.socket.connect();
      } else {
          $errorField.text(data);
          $errorField.removeClass('hidden');
      }
    });
  });
}());
