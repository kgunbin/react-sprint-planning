var express = require('express');
var app = express();
var http = require('http').Server(app);

function initSockets(http) {
  var io = require('socket.io')(http);
  var _ = require('lodash');
  var actionTypes = require('../shared/constants');
  var rooms = [];
  var lastRoomId = 1000;

  function joinAndNotify(socket, room, name) {
    socket.join(room.id);
    room.users.push({name: name, id: socket.id});
    io.to(room.id).emit('action', {type: actionTypes.NEW_USER, users: _.map(room.users, 'name')});
  }

  io.on('connection', (socket) => {
    socket.on('action', (action) => {
      var room = rooms.find((c) => c.id == action.room);
      if (room == null && action.type != actionTypes.SERVER_NEW_ROOM) {
        socket.emit('action', {type: actionTypes.ERROR, error: `The room ${action.room} doesn't exist`});
      }
      switch (action.type) {
        case actionTypes.SERVER_NEW_ROOM:
          room = {id: ++lastRoomId, users: [], votes: [], topic: ''};
          rooms.push(room);
          joinAndNotify(socket, room, action.username);
          socket.emit('action', {type: actionTypes.ROOM_CREATED, room: room});
          break;
        case actionTypes.SERVER_JOIN_ROOM:
          joinAndNotify(socket, room, action.username);
          socket.emit('action', {type: actionTypes.ROOM_JOINED, room: room});
          break;
        case actionTypes.SERVER_NEW_TOPIC:
          room.topic = action.name;
          io.to(action.room).emit('action', {type: actionTypes.TOPIC_CREATED, description: action.name});
          break;
        case actionTypes.SERVER_USER_VOTED:
          io.to(action.room).emit('action', {type: actionTypes.USER_VOTED, username: action.username, vote: action.vote});
          room = rooms.find((c) => c.id == action.room);

      };
      socket.on('disconnect', function () {
        rooms.forEach((room) => {
          var user = _.find(room.users, (u) => (u.id === socket.id));

          if (user) {
            room.users.splice(room.users.indexOf(user), 1);
            io.to(room.id).emit('action', {type: actionTypes.USER_LEFT, users: _.map(room.users, 'name')});
          }
          // Remove empty rooms
          if (room.users.length === 0) {
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
};

initSockets(http);

module.exports = (port, path, callback) => {
  app.use(express.static(path));
  http.listen(port, callback);
  return http;
};
