import actionTypes from '../../../common/constants';

function join(roomId, username) {
  return {
    type: actionTypes.SERVER_JOIN_ROOM,
    room: roomId,
    username: username
  };
}

function create(username) {
  return {
    type: actionTypes.SERVER_NEW_ROOM,
    username: username
  };
}

export {create, join};
