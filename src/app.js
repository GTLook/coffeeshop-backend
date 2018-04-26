var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    setTimeout(()=>io.emit('chat message response', msg),500);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
