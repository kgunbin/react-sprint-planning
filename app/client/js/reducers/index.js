import { combineReducers } from 'redux';
import session from './session';
import topic from './topic';
import actionTypes from '../../../shared/constants';

function error(state = '', action) {
  if (action.type === actionTypes.ERROR) {
    return action.error;
  }
  return state;
}

export default combineReducers({error, session, topic});
