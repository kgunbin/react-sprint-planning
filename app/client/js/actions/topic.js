import actionTypes from '../../../shared/constants';

function createTopic(room, topicName) {
  return {
    type: actionTypes.SERVER_NEW_TOPIC,
    room: room,
    name: topicName
  };
}

export { createTopic };
