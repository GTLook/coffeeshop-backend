//////////////////////////////////////////////////////////////////////////////
// Initilize modules
//////////////////////////////////////////////////////////////////////////////

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')

const path = require('path')
const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
if(process.env.NODE_ENV !== 'production') require('dotenv').load()

//////////////////////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////////////////////

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/api/customer', require('./routes/customer'))
app.use('/api/shop', require('./routes/shop'))


//////////////////////////////////////////////////////////////////////////////
// Default Route
//////////////////////////////////////////////////////////////////////////////

app.use((req, res, next) => next({status: 404, message: 'Route not found' }))


//////////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////////

app.use((err, req, res, next) => {
  const errorMessage = {}

  if(process.env.NODE_ENV !== 'production' && err.stack)
    errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})


//////////////////////////////////////////////////////////////////////////////
// Sockets & Serve
//////////////////////////////////////////////////////////////////////////////

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000
let clients = []


io.on('connection', function(socket){
  clients.push({
    socketId:socket.id,
    token: socket.handshake.query.token
  })
  console.log(clients)
  // console.log(socket.handshake.query.token)
  socket.on('chat message', function(msg){
    console.log(msg);
    const targetClient = clients.find(el => el.token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI4Mzg4MzMzfQ.dxZZ-rC-mon4U6QWNCsJ5yrJlQZMqW4dhshl-Pxn6o0')
    console.log(targetClient)
    io.sockets.connected[targetClient.socketId || null].emit('chat message response', msg)
  })

  socket.on('disconnect', function() {
      clients = clients.filter(client => client.socketId !== socket.id)
      console.log('Got disconnect!');
   });
})

//////////////////////////////////////////////////////////////////////////////
// Starting Server
//////////////////////////////////////////////////////////////////////////////

http.listen(port, () => {console.log(`Listening on port ${port}`)})

module.exports = app
