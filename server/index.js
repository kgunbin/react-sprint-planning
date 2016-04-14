var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

import actionTypes from '../common/constants';

var storage = {};
var rooms = [];
var lastRoomId = 1000;

app.get('/', (req, res)=> {
  res.send('<h1>Yep, working</h1>');
});

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    switch (action.type) {
      case actionTypes.SERVER_NEW_ROOM:
        rooms.push({id: ++lastRoomId, users: [action.username]});
        socket.join(lastRoomId);
        socket.emit('action', {type: actionTypes.ROOM_CREATED, room: lastRoomId});
        break;
      case actionTypes.SERVER_JOIN_ROOM:
      console.log(rooms);
        var roomId = action.room;
        var room = rooms.find((c) => c.id == roomId);

        room.users.push(action.username);
        socket.join(roomId);
        socket.to(roomId).emit('action', {type: actionTypes.NEW_USER, users: room.users});
        break;
    }
  });

  // socket.on(CONST.NEW_ROOM, (room)=> {
  //   socket.join(room);
  //   if (typeof rooms[room] === "undefined") {
  //     rooms[room] = {users: [socket.id];
  //   } else {
  //     rooms[room].users.push(socket.id);
  //   }
  //   io.to(room).emit(CONST.NEW_USER, new Set(rooms[room].users).size);
  // });
});

http.listen(3009, ()=> {
  console.log('listening on *:3009');
});
