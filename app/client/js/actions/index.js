import * as session from './session';
import * as topic from './topic';
import actionTypes from '../../../shared/constants';

function clearError() {
  return {
    type: actionTypes.ERROR,
    error: null
  };
}

const creators = Object.assign({}, {clearError: clearError}, session, topic);

export default creators;
