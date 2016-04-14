import React from 'react';
import * as RB from 'react-bootstrap';

class Room extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.required,
    room: React.PropTypes.string.required
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RB.Row>
        <RB.Col md={12}>
          {'Connected as ' + this.props.room}
        </RB.Col>
      <RB.Row>
      </RB.Row>
        {
          this.props.users.map((user, i) => {
            return (
              <div key={i}>{user}</div>
            );
          })
        }
      </RB.Row>);
  }
}

export default Room;
