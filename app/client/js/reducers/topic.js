import { combineReducers } from 'redux';
import actionTypes from '../../../shared/constants';

function description(state = null, action) {
  if (action.type === actionTypes.TOPIC_CREATED) {
    return action.description;
  }
  return state;
};

function votes(state = [], action) {
  return state;
};

function jira(state = null, action) {
  return state;
};

export default combineReducers({description, votes, jira});
