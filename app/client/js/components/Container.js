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
    error: React.PropTypes.string,
    actions: React.PropTypes.shape({
      join: React.PropTypes.func.isRequired,
      create: React.PropTypes.func.isRequired,
      clearError: React.PropTypes.func.isRequired,
      createTopic: React.PropTypes.func.isRequired
    })
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
          createTopic={this.props.actions.createTopic}
        />
      );
    }
    return ret;
  }
  renderError = () => {
    if (this.props.error) {
      return (
        <RB.Alert bsStyle='danger' onDismiss={this.props.actions.clearError} dismissAfter={3000}>
          <p>{this.props.error}</p>
        </RB.Alert>
      );
    }
    return null;
  }
  render() {
    return (
      <RB.Grid>
        {this.renderError()}
        {this.renderContent()}
      </RB.Grid>
    );
  }
}

export default connect((state) => (
  Object.assign({}, {error: state.error}, _.pick(state.session, 'room', 'users'))
), (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))(Container);
