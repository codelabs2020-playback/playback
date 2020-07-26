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

//this global exposure isn't safe in the long run; ensure they are encrypted
var first_execution = true;

var names = []; //to keep track of usernames in a room
var name = '';

var room = '';

var roomCreatedFlag;
var numberOfUsers; //for more accurate check of number of users in room directly using socket

const socket = io().connect();

/*
//function to check if entered chat name is unique
function uniqueCheck(name) {
    var unique = true;

    if (names.length === 0) { //checks for uniqueness before new name entered
        //if no other names in the room, selected name must be unique
        return unique;
    } else {
        for (var i = 0; i < names.length; i++) {
            if (names[i] === name) {
                unique = false;
            }
        }
    }

    return unique;
}
*/

//on click, opening chat bar
function openForm() {

    if (first_execution) {
        first_execution = false;

        name = prompt('Set your username: ', 'Anonymous');
        names.push(name);

        /*
        while (!uniqueNameCheck(name)) {
            name = prompt('Username taken. Try again: ');
        }
        */

        room = prompt('Enter your room ID: '); //later, create room uniqueness check and hash generator

        //add rooms for users
        socket.emit('join', room);
        roomCreatedFlag = true;
    }

    document.getElementById("myForm").style.display = "block";
    document.getElementById("chat_bar").style.display = "none";
}

//on click, minimizing chat bar
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("chat_bar").style.display = "block";
}

//emit message through socket and display new comments.
$(function () {
    $('form').submit(function(e){
      e.preventDefault();

      //get the timestamp
      var today = new Date();
      var time = ((today.getHours() % 12 ) || 12) + ":" + today.getMinutes() + ":" + today.getSeconds();

      let messageContent = $('#m').val()

      // these fields could act as the unique identifer for a session
      // 'roomID':room,
      index = 0
      videoSrc = 'http:the-video-url.com'
      pageUrl = 'http:the-page-url.com'

      //emit username, message, and timestamp
      socket.emit('chat message', name + ' (' + time +'): ' + messageContent);
      const payload = {
                        'content': messageContent,
                        'username': name,
                        'timestamp':time,
                        'roomID':room,
                        'videoIndex':index,
                        'videoUrlSrc':videoSrc,
                        'pageUrl':pageUrl
                      }
      submitSuccessful = submitComment(payload)
      if (submitSuccessful){
          $('#m').val('');
      }
      return false;
    });

    socket.on('chat message', function(msg){
      if (msg != '') {
        $('#messages').append($('<li>').text(msg));
      }
    });
});

function submitComment(data) {
    // we're probably going to want to make this an environment variable:
    const backendURL = "http://localhost:15000/api/v1/comment/new"
    // numberOfUsers = io.sockets.adapter.rooms[room].length;
    // if (numberOfUsers === 0 && roomCreatedFlag == true) {
        fetch (backendURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                    }
                ).then(res => {
                    result = res.json();
                    console.log(res.statusCode);
                    return res.statusCode==200
        })

        // THIS WORKS:
        // const testURL = 'https://play-tictactoe-ai.herokuapp.com/api/v1/rand/turn/o/board/xox!o!!x'
        // fetch (testURL, {
        //             // method: 'POST',
        //             // headers: { 'Content-Type': 'application/json',
        //             //             'Access-Control-Allow-Origin': '*'},
        //             // body: JSON.stringify(data)
        //             }
        //         ).then(res => {
        //             result = res.json();
        //             console.log(result);
        //             return res.statusCode==200
        // })
}
