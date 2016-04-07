import { connect } from 'react-redux';
import React from 'react';
import actionCreators from '../actions';
import { bindActionCreators } from 'redux';
import Welcome from './Welcome';
import _ from 'lodash';

class Container extends React.Component {
  static defaultProps = {
    users: [],
    room: null,
    actions: null
  }
  constructor(props) {
    super(props);
  }
  render() {
    var ret;

    if (this.props.room == null) {
      ret = (
        <Welcome
          onCreate={this.props.actions.create}
          onJoin={this.props.actions.join}
        />
      );
    } else {
      ret = (
        <div>
          <div>
            {'Connected as ' + this.props.room}
          </div>
          {
            this.props.users.map((user, i) => {
              return (
                <div key={i}>{user}</div>
              );
            })
          }
        </div>);
    }
    return ret;
  }
}

Container.propTypes = {
  room: React.PropTypes.number,
  users: React.PropTypes.array,
  actions: React.PropTypes.object
};

export default connect((state) => (
  _.pick(state.session, 'room', 'users')
), (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))(Container);
