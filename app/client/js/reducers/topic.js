import { combineReducers } from 'redux';

function description(state = null, action) {
  return state;
};

function votes(state = [], action) {
  return state;
};

function jira(state = null, action) {
  return state;
};

export default combineReducers({description, votes, jira});
