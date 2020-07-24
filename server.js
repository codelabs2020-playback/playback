var express = require('express');
var path = require("path");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//io = socketio.listen(server);

var port = 8000;

// Chat events when client connects
app.use(express.static(path.join(__dirname, "public")));

server.listen(process.env.PORT || 8000, function() {
    console.log("Listening to port: " + port);
});

io.on("connection", function(socket) {

    //once cllient has connected, recieve ping about which room they wish to join
    socket.on('room', function(room) {
        socket.join(room);
    })


    //disconnect
    /* socket.on("disconnect", function(data) { }); */

    //recieving and publishing messages
    socket.on('chat message', function(msg) {
        io.socket.in(room).emit('chat message', msg);
    });
});
