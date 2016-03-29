var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.get('/', (req, res)=> {
  res.send('<h1>Yep, working</h1>');
});

io.on('connection', (socket)=> {
  users.push({id: socket.id});
  console.log(socket.handshake.query.param);

  io.emit('user:join', {user: socket.id});
  socket.on('chat message', (msg)=> {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', ()=> {
    io.emit('user:left', {user: users.size});
  });
});

http.listen(3009, ()=> {
  console.log('listening on *:3009');
});
