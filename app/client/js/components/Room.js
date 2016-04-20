import React from 'react';
import * as RB from 'react-bootstrap';
import User from './User';

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
      <div>
        <RB.Jumbotron>
          <h2>{'Connected to ' + this.props.room}</h2>
        </RB.Jumbotron>

        {
          this.props.users.map((user, i) => {
            return (
              <User key={i} username={user} />
            );
          })
        }
      </div>
    );
  }
}

export default Room;
