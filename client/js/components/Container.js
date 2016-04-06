import { connect } from 'react-redux';
import React from 'react';
import actionCreators from '../actions';
import { bindActionCreators } from 'redux';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var ret;

    if (this.props.room == null) {
      ret = (
        <div>
          <div>Not connected</div>
          <input type='button' onClick={this.props.actions.create} value={'Connect'} />
        </div>
      );
    } else {
      ret = (<div>{'Connected as ' + this.props.room}</div>);
    }
    return ret;
  }
}

Container.propTypes = {
  room: React.PropTypes.number,
  actions: React.PropTypes.object
};

export default connect((state) => ({
  room: state.session.room
}), (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))(Container);
