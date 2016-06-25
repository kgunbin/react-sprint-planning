import React from 'react';
import * as RB from 'react-bootstrap';
import User from './User';
import Topic from './Topic';
import Vote from './Vote';

class Room extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
    room: React.PropTypes.object.isRequired,
    topicName: React.PropTypes.string
  }
  render() {
    return (
      <div>
        <h2>{'Connected to ' + this.props.room.id}</h2>
        <RB.Jumbotron>
          <Topic
            {...this.props}
          />
        </RB.Jumbotron>

        {
          this.props.users.map((user, i) => {
            return (
              <User key={`user_${i}`} username={user} />
            );
          })
        }

        <Vote {...this.props} />
      </div>
    );
  }
}

export default Room;
