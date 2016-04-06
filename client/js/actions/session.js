import actionTypes from '../../../common/constants';

function join(roomId) {
  return {
    type: actionTypes.JOIN_ROOM,
    room: roomId
  };
}

function create() {
  return {type: actionTypes.SERVER_NEW_ROOM};
}

export {create, join};
