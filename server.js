var express = require('express');
var path = require("path");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*
var sessions = {};
*/

var connections = [];
var port = 8000;

// Chat events when client connects
app.use(express.static(path.join(__dirname, "public")));

server.listen(process.env.PORT || 8000, function() {
    console.log("Listening to port: " + port);
});

/*
function makeId() { //makes an authentication id for the user
    var hexChars = '0123456789abcdef';
    var result = '';

    for (var i = 0; i < 17; i++) {
        result += hexChar[Math.floor(Math.random() * 16)];
    }  

    return result;
}
*/

io.on("connection", function(socket) {
    console.log("New connection made!");

    //add to list of connections for socket
    connections.push(socket);
    console.log("connected: ", connections.length);

    /*
    socket.emit('userId', userId);
    console.log('User ' + userId + ' connected.');
    */

    //disconnect
    socket.on("disconnect", function(data) {
        //users.splice(users.indexOf(userId), 1);
        connections.splice(connections.indexOf(socket), 1);
        //console.log('User ' + userId + ' disconnected.');
        console.log("connected: ", connections.length);
    });

    //recieving and publishing messages
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});
