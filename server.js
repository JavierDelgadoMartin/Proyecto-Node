var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var delivery = require("delivery");
var fs = require("fs");
var usuarios = {};

app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.on("new user", function(name,avatar){
    var user = {"id":socket.id,"name":name,"avatar":avatar};
    socket.emit("allUsers",usuarios);
    usuarios[socket.id] = {"id":socket.id,"name":name,"avatar":avatar};
    socket.broadcast.emit("new user",user);
  });

  socket.on("writting",function(name){
    socket.broadcast.emit("writting",name)
  });

  socket.on('newMesaje', function(msg){
    socket.broadcast.emit('newMesaje', msg);
  });

  socket.on('disconnect', function(){
    if(usuarios[socket.id]!=undefined){
      delete usuarios[socket.id];
      socket.broadcast.emit("userDisconnect",socket.id);
    }
  });

});