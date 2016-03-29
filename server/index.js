var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;

app.get('/', (req, res)=> {
  res.send('<h1>Yep, working</h1>');
});

io.on('connection', (socket)=> {
  console.log('a user connected');
  io.emit('user:join', {user: users++});
  socket.on('chat message', (msg)=> {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', ()=> {
    console.log('user disconnected');
  });
});

http.listen(3009, ()=> {
  console.log('listening on *:3009');
});
