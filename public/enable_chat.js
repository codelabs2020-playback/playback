//highlighting video on hover and removing off hover 
document.getElementById("enablebutton").onmouseover = function() {mouseOver()};
document.getElementById("enablebutton").onmouseout = function() {mouseOut()};
function mouseOver() {
    document.getElementById("duckvideo").style.opacity= ".5";
}
function mouseOut() {
    document.getElementById("duckvideo").style.opacity= "1";
}
//showing chatbar after selecting video and removing hover highlighting
function showChat() {
    var video_element = document.getElementById("duckvideo");
    video_element.classList.toggle("highlight");

    var button_element = document.getElementById("enablebutton");
    button_element.classList.toggle("buttons");

    document.getElementById("chat_bar").style.display="inline";
}

//on click, opening chat bar
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
//on click, minimizing chat bar
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//emit message through socket and display new comments

$(function () {
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