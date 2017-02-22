var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var delivery = require("delivery");
var usuarios = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.emit();
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});