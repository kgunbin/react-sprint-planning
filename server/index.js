var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

import actionTypes from '../common/constants';

var storage = {};
var rooms = [];
var lastRoomId = 1000;

app.get('/', (req, res)=> {
  res.send('<h1>Yep, working</h1>');
});

function joinAndNotify(socket, room, name) {
  socket.join(room.id);
  room.users.push({name: name, id: socket.id});
  io.to(room.id).emit('action', {type: actionTypes.NEW_USER, users: _.map(room.users, 'name')});
}

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    switch (action.type) {
      case actionTypes.SERVER_NEW_ROOM:
        var room = {id: ++lastRoomId, users: []};
        rooms.push(room);
        joinAndNotify(socket, room, action.username);
        socket.emit('action', {type: actionTypes.ROOM_CREATED, room: lastRoomId});
        break;
      case actionTypes.SERVER_JOIN_ROOM:
        var room = rooms.find((c) => c.id == action.room);
        if(room != null) {
          joinAndNotify(socket, room, action.username);
          socket.emit('action', {type: actionTypes.ROOM_JOINED, room: room.id});
        } else {
          socket.emit('action', {type: actionTypes.ERROR, error: `The room ${action.room} doesn't exist`});
        }
        break;
    };
    socket.on('disconnect', function () {
      rooms.forEach((room) => {
        var user = _.find(room.users, (u) => (u.id == socket.id));
        if (user) {
          room.users.splice(room.users.indexOf(user), 1);
          io.to(room.id).emit('action', {type: actionTypes.USER_LEFT, users: _.map(room.users, 'name')});
        }
        // Remove empty rooms
        if (room.users.length == 0) {
          rooms.splice(rooms.indexOf(room), 1);
        }
      });
    });
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
