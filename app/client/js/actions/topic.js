import actionTypes from '../../../shared/constants';

function createTopic(topicName, room) {
  return {
    type: actionTypes.SERVER_NEW_TOPIC,
    room: room,
    name: topicName
  };
}

export { createTopic };
