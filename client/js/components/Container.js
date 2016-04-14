import { connect } from 'react-redux';
import React from 'react';
import actionCreators from '../actions';
import { bindActionCreators } from 'redux';
import Welcome from './Welcome';
import Room from './Room';
import _ from 'lodash';
import * as RB from 'react-bootstrap';

class Container extends React.Component {
  static defaultProps = {
    users: [],
    room: null,
    actions: null
  }
  static propTypes = {
    room: React.PropTypes.number,
    users: React.PropTypes.array,
    actions: React.PropTypes.object
  }
  constructor(props) {
    super(props);
  }
  renderContent = () => {
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
        <Room
          users={this.props.users}
          room={this.props.room}
        />
      );
    }
    return ret;
  }
  render() {
    return (
      <RB.Grid>
        {this.renderContent()}
      </RB.Grid>
    );
  }
}

export default connect((state) => (
  _.pick(state.session, 'room', 'users')
), (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))(Container);
