const express = = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const authController = require('./controllers/auth')

if (process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}

const app = express()


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())



//  Routes //










//  Sockets & Serve//


const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    setTimeout(()=>io.emit('chat message response', msg),500);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
