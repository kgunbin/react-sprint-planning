import { combineReducers } from 'redux';
import actionTypes from '../../../shared/constants';

function description(state = null, action) {
  switch (action.type) {
    case actionTypes.TOPIC_CREATED:
      return action.description;
    case actionTypes.ROOM_JOINED:
      return action.room.topic;
  }
  return state;
};

function votes(state = [], action) {
  switch (action.type) {
    case actionTypes.USER_VOTED:
      return state.filter((v) => v.userid !== action.userid).concat({
        userid: action.userid,
        vote: action.vote
      });
  }
  return state;
};

function jira(state = null, action) {
  return state;
};

export default combineReducers({description, votes, jira});
