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

var first_execution = true;
var name = '';
var room = '';

//on click, opening chat bar
function openForm() {

    if (first_execution) {
        name = prompt('Set your username: ');
        room = prompt('Enter your room ID: ');

        first_execution = false;
    }

    document.getElementById("myForm").style.display = "block";
    document.getElementById("chat_bar").style.display = "none";
}
//on click, minimizing chat bar
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("chat_bar").style.display = "block";
}

//emit message through socket and display new comments

$(function () {
    const socket = io().connect(); 

    //add rooms for users
    socket.on('connect', function() {
        socket.emit('join', room);
    });

    $('form').submit(function(e){
      e.preventDefault();
      
      //get the timestamp
      var today = new Date();
      var time = ((today.getHours() % 12 ) || 12) + ":" + today.getMinutes() + ":" + today.getSeconds();

      //emit username, message, and timestamp
      socket.emit('chat message', name + ' (' + time +'):' + $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', function(msg){
      if (msg != '') {
        $('#messages').append($('<li>').text(msg));
      }
    });
}); 