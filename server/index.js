var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

import CONST from '../common/constants';

var storage = {};
var rooms = [];

app.get('/', (req, res)=> {
  res.send('<h1>Yep, working</h1>');
});

io.on('connection', (socket)=> {
  socket.on(CONST.NEW_ROOM, (room)=> {
    socket.join(room);
    if (typeof rooms[room] === "undefined") {
      rooms[room] = {users: [socket.id];
    } else {
      rooms[room].users.push(socket.id);
    }
    io.to(room).emit(CONST.NEW_USER, new Set(rooms[room].users).size);
  });
});

http.listen(3009, ()=> {
  console.log('listening on *:3009');
});
