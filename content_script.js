//Inject HTML elements into webpage
$.get(chrome.runtime.getURL('/index.html'), function(data) {
    $($.parseHTML(data)).appendTo('body');
});

var vid = document.querySelectorAll("video")
var enable_button = document.getElementById("comment_button")

//highlighting video and displaying enable button on hover  
function highlight(x){
    x.style.opacity = ".5";
    document.getElementById("enablebutton").style.display = "block";
    document.getElementById("enablebutton").addEventListener("mouseenter", function(){
        document.getElementById("enablebutton").style.display = "block"; x.style.opacity = ".5";
    })
}
for (Element of vid) {
    Element.onmousemove = function(){highlight(Element)};
}

//removing highlight and button when off hover
function remove_highlight(x){
    x.style.opacity = "1";
    document.getElementById("enablebutton").style.display = "none";
}
for (Element of vid) {
    Element.onmouseleave = function(){remove_highlight(Element)};
}

if (enable_button.clicked == true) {
    document.getElementById("enablebutton").style.display = "none";
    document.getElementById("chat_bar").style.display = "block";
}

jQuery.noConflict();
document.addEventListener('DOMContentLoaded',()=>{
    showChat();
})

//showing chat on click of enable button
function showChat(){
    document.getElementById("enablebutton").style.display = "none";
    document.getElementById("chat_bar").style.display = "block";
}