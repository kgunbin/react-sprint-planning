import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';

class Welcome extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.function,
    onJoin: React.PropTypes.function
  }
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      username: null
    };
    // this.handleRoomChange.bind(this);
  }
  handleRoomChange = (e) => {
    this.setState({
      room: e.target.value
    });
  }
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Input type='text' value={this.state.username} onChange={this.handleUsernameChange} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button onClick={() => this.props.onCreate(this.state.username)}>
              Create new session
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Input type='text' value={this.state.room} onChange={this.handleRoomChange}/>
          </Col>
          <Col md={4}>
            <Button bsStyle='primary' onClick={() => this.props.onJoin(this.state.room, this.state.username)}>
              Join
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;
