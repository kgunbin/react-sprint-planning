import React from 'react';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import { bindActionCreators } from 'redux';
import Welcome from './Welcome';
import Room from './Room';
import * as RB from 'react-bootstrap';
import cookie from 'react-cookie';
import url from 'url';

class Container extends React.Component {
  static defaultProps = {
    users: [],
    room: null,
    actions: null
  }
  static propTypes = {
    session: React.PropTypes.shape({
      room: React.PropTypes.number,
      users: React.PropTypes.array
    }),
    topic: React.PropTypes.shape({
      description: React.PropTypes.string,
      votes: React.PropTypes.array
    }),
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
    this.state = {
      room: url.parse(window.location.href, true).query.room,
      username: cookie.load('username'),
      topic: {}
    };
  }
  renderContent = () => {
    var ret;

    if (this.props.session.room == null) {
      ret = (
        <Welcome
          room={this.state.room}
          username={this.state.username}
          handleRoomChange={this.handleRoomChange}
          handleUsernameChange={this.handleUsernameChange}
          onCreate={() => this.props.actions.create(this.state.username)}
          onJoin={() => this.props.actions.join(this.state.room, this.state.username)}
        />
      );
    } else {
      ret = (
        <Room
          users={this.props.session.users}
          room={this.props.session.room}
          topicName={this.state.topic.description}
          handleTopicChange={this.handleTopicChange}
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

  handleRoomChange = (e) => {
    this.setState({
      room: e.target.value
    });
  }
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    }, () => {
      cookie.save('username', this.props.username, { path: '/' });
    });
  }
  handleTopicChange = (e) => {
    this.setState({
      topicName: e.target.value
    },() => {
      this.props.actions.createTopic(this.state.topicName, this.state.room)
    });
  }
}

export default connect(
  (state) => (state),
  (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Container);
