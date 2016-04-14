import * as session from './session';
import actionTypes from '../../../common/constants';

function clearError() {
  return {
    type: actionTypes.ERROR,
    error: null
  };
}

const creators = Object.assign({}, {clearError: clearError}, session);

export default creators;
