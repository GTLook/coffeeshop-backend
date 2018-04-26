const express = require('express')
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



//  Routes

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/messages', require('./routes/messages'))
app.use('/users_users', require('./routes/users_users'))


// Default Route

app.use(function(req, res, next){
  next({status: 404, message: 'Route not found' })
})


// Error Handling

app.use(function(err, req, res, next){
  const errorMessage = {}

  if(process.env.NODE_ENV !== 'production' && err.stack)
    errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})



//  Sockets & Serve//


const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    setTimeout(()=>io.emit('chat message response', msg),0);
  })
  // socket.on('new message', function(msg){
  //   console.log(msg);
  //   setTimeout(()=>io.emit('new message response', msg),500);
  // })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
