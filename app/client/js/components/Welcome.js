import React from 'react';
import * as RB from 'react-bootstrap';

class Welcome extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func.isRequired,
    onJoin: React.PropTypes.func.isRequired
  }
  render() {
    return (
      <div>
        <RB.Jumbotron>
          <h1>Welcome</h1>
        </RB.Jumbotron>
        <RB.Row>
          <RB.Col md={4}>
            <p>Pick a user name</p>
          </RB.Col>
          <RB.Col md={6}>
            <RB.Input type='text' value={this.props.username} onChange={this.props.handleUsernameChange} />
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col md={4}>
            <RB.Button onClick={this.props.onCreate}>
              Create new session
            </RB.Button>
          </RB.Col>
          <RB.Col md={1}>
            <p>or</p>
          </RB.Col>
          <RB.Col md={4}>
            <RB.Input type='text' value={this.props.room} onChange={this.props.handleRoomChange}/>
          </RB.Col>
          <RB.Col md={3}>
            <RB.Button bsStyle='primary' onClick={this.props.onJoin}>
              Join
            </RB.Button>
          </RB.Col>
        </RB.Row>
      </div>
    );
  }
}

export default Welcome;
