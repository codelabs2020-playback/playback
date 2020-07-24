$(function () {
    $( function() {
        $( "#chatbox" ).draggable().resizable();
    } );

    var socket = io().connect();

    $('form').submit(function(e){
      e.preventDefault();
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(users[userId] + ': ' + msg));
      window.scrollTo(0, document.body.scrollHeight);
    });
});