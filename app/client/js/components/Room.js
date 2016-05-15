import React from 'react';
import * as RB from 'react-bootstrap';
import User from './User';
import Topic from './Topic';

class Room extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
    room: React.PropTypes.number.isRequired,
    topicName: React.PropTypes.string
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>{'Connected to ' + this.props.room}</h2>
        <RB.Jumbotron>
          <Topic
            {...this.props}
          />
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
