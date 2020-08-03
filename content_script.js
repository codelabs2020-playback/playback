//add html elements to webpage
var bod = document.getElementsByTagName('body')[0];

bod.insertAdjacentHTML('beforeend', `
<style>
    @import "${chrome.runtime.getURL("main.css")}";
</style>
<div id="enablebutton" class="buttons">
    <button id="comment_button">Click to Enable Commenting!</button>
</div>
<button id="chat_bar" class="open-button">Comments</button>
<div class="chat-popup form-container" id="myForm">
<h1>Playback</h1>
<label for="table"><b>Comments</b></h2>
<div class="table scroll"> 
    <table id="comment_table" name="table" class="rowspacing">
        <tbody id="comment_section">
        </tbody> 
    </table>
</div>
<table>
    <td>
        <textarea id="comment" placeholder="Type comment..." required></textarea>
        <input class="btn" type="button" id="enter_button" value="Enter"></td>
    </td>
</table>
<button type="button" class="cancel" id="close_button">Close</button>
</div>
`);

//get all videos
var vids = document.querySelectorAll("video")

//enabling highlight on hover by adding class to all videos
for (var i=0; i<vids.length; i++){
    vids[i].classList.add("highlight")
}

//displaying enable button on hover  
function highlight(x){
    document.getElementById("enablebutton").style.display = "block";
    document.getElementById("enablebutton").addEventListener("mouseenter", function(){
        document.getElementById("enablebutton").style.display = "block";
        x.style.opacity = ".5";
    })
}
for (Element of vids) {
    Element.onmouseover = function(){highlight(Element)};
}

//removing button off hover
function remove_highlight(x){
    document.getElementById("enablebutton").style.display = "none";
    document.getElementById("enablebutton").addEventListener("mouseleave", function(){
        x.style.opacity = "";
    })
}
for (Element of vids) {
    Element.onmouseout = function(){remove_highlight(Element)};
}

//displaying chat on click of enable button
showChat();

function showChat(){
    var button_element = document.getElementById("comment_button");
    button_element.addEventListener('click', function() {
        document.getElementById("enablebutton").classList.toggle("buttons");
        $("video").toggleClass("highlight")
        document.getElementById("chat_bar").style.display="block";
    });
}

//on click, opening chat bar
openChat();

function openChat() {
    var chat_button = document.getElementById("chat_bar")
    chat_button.addEventListener('click', function(){
        document.getElementById("myForm").style.display = "block";
    });
  }

//on click, minimizing chat bar
closeChat();

function closeChat() {
    var close_button = document.getElementById("close_button")
    close_button.addEventListener('click', function(){
        document.getElementById("myForm").style.display = "none";
    });
}

//add socket.io in here and in manifest