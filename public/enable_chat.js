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
var names = [];
var rooms = [];
var name = '';
var room = '';
const socket = io().connect(); 

//function to check if entered chat name and room name is unique; generate hex
function uniqueCheck(variable) {
    var variableArrayName = Object.keys({variable})[0] + 's';
    var unique = true;

    if (variableArrayName.length === 0) { //checks for uniqueness before new name entered
        //if no other names in the room, selected name must be unique
        return unique;
    } else {
        for (var i = 0; i < variableArrayName.length; i++) {
            if (variableArrayName[i] === variable) {
                unique = false;
            }
        }
    }

    return unique;
}

/*
function generateHash() {
    var result = '';
    var hexChars = '0123456789abcdef';

    for (var i = 0; i < 16; i += 1) {
      result += hexChars[Math.floor(Math.random() * 16)];
    }

    return result;
}
*/

//on click, opening chat bar
function openForm() {

    if (first_execution) {
        first_execution = false;

        name = prompt('Set your username: ', 'Anonymous');

        while (!uniqueNameCheck(name)) {
            name = prompt('Username taken. Try again: ');
        }

        names.push(name);


        room = prompt('Enter your room ID: ');
        rooms.push(room);

        /*
        rooms.push(room);

        if (uniqueRoomCheck(room)) {
            var sessionID = generateHash(); //supply this and room name to database
        }
        */

        //add rooms for users
        socket.emit('join', room);
    }

    document.getElementById("myForm").style.display = "block";
    document.getElementById("chat_bar").style.display = "none";
}

//on click, minimizing chat bar
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("chat_bar").style.display = "block";
}

//json data

/*
var data = {
    "roomName" : "placeholder",
    "roomUniqueID" : "placeholder",
    "messageLog" : "placeholder",
}
*/

//emit message through socket and display new comments. 
$(function () {
    $('form').submit(function(e){
      e.preventDefault();
      
      //get the timestamp
      var today = new Date();
      var time = ((today.getHours() % 12 ) || 12) + ":" + today.getMinutes() + ":" + today.getSeconds();

      //emit username, message, and timestamp
      socket.emit('chat message', name + ' (' + time +'): ' + $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', function(msg){
      if (msg != '') {
        $('#messages').append($('<li>').text(msg));
      }

      //whenever there is a chat message, append this to the json data, which will be sent when the room is closed
    });
}); 

/*
function submitData() {

    const data = "data to be sent"
    const backendURL = "http://localhost:7000/api/v1/back-end-route-specific-to-what-we're-sending"
    // Send data to the API with fetch
    fetch (backend, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                }
            ).then(res => {
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => {
      response = json.fieldName
    }).catch((err) => {
      console.log('-- Error fetching --')
      console.log(err.message)
    })  
}
*/