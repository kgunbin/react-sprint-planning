import { combineReducers } from 'redux';
import actionTypes from '../../../shared/constants';

function users(state = [], action) {
  if ([actionTypes.NEW_USER, actionTypes.USER_LEFT].indexOf(action.type) > -1) {
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
  if ([actionTypes.ROOM_CREATED, actionTypes.ROOM_JOINED].indexOf(action.type) > -1) {
    return action.room;
  }
  return state;
};

export default combineReducers({users, me, jira, room});
