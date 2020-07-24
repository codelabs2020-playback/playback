//connect to socket
var socket = io().connect();

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
function addRow(e) {
    //emit message through socket.io
    e.preventDefault();
    var message = document.getElementById('comment').value;
    socket.emit('chat message', message);
    message.value = ''; //clear message area

    //display comments
    var comment = document.getElementById("comment");
    var table = document.getElementById("comment_table");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    /* input validation: check for blank input */
    var remove_white = comment.value.trim();
    if (remove_white!=='') {
        row.insertCell(0).innerHTML= comment.value;
    } else {
        alert("Please enter valid comment.")
    }
}

