var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var delivery = require("delivery");
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
  socket.on("new user", function(user){
    user[id]=socket.id;
    socket.emit("allUsers",usuarios);
    socket.broadcast.emit("new user",user);

  });
  socket.on('newMesaje', function(msg){
    socket.broadcast.emit('newMesaje', msg);
  });
  socket.on('disconnect', function(){
    console.log(socket.id);
    console.log('user disconnected');
  });
});