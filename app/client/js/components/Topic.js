import React from 'react';
import * as RB from 'react-bootstrap';

export default class Topic extends React.Component {
  static propTypes = {
  }
  render() {
    return (
      <div>
        <RB.Input type='text' value={this.props.topicName} onChange={this.props.handleTopicChange} />
        <RB.Button onClick={this.props.handleResetVotes}>Reset Votes</RB.Button>
      </div>
    );
  }
}
