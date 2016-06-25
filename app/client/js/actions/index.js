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
  (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: actionTypes.SERVER_USER_VOTED,
      username: state.session.me,
      room: state.session.room,
      vote: vote
    });
  };
}

const creators = Object.assign({},
  {clearError},
  vote,
  session,
  topic);

export default creators;
