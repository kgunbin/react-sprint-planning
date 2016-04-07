import { combineReducers } from 'redux';
import actionTypes from '../../../common/constants';

function users(state = [], action) {
  if (action.type === actionTypes.NEW_USER) {
    return action.users;
  }
  return state;
};

function me(state = {id: null, username: null}, action) {

  return state;
};

function jira(state = {enabled: false, username: null, password: null, url: null}, action) {

  return state;
};

function room(state = null, action) {
  if (action.type === actionTypes.ROOM_CREATED) {
    return action.room;
  }
  return state;
};

export default combineReducers({users, me, jira, room});
