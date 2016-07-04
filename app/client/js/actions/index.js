import * as session from './session';
import * as topic from './topic';
import actionTypes from '../../../shared/constants';

function clearError() {
  return {
    type: actionTypes.ERROR,
    error: null
  };
}

function vote(vote) {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: actionTypes.SERVER_USER_VOTED,
      username: state.session.me,
      room: state.session.room.id,
      vote: vote
    });
  };
}

const creators = Object.assign({},
  {vote, clearError},
  session,
  topic);

export default creators;
