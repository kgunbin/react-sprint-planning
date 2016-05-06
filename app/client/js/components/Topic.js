import React from 'react';
import * as RB from 'react-bootstrap';

export default class Topic extends React.Component {
  static propTypes = {
    onTopicSet: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      topicName: null
    };
  }

  handleTopicChange = (e) => {
    this.setState({
      topicName: e.target.value
    });
  }

  render() {
    return (
      <div>
        <RB.Input type='text' value={this.state.topicName} onChange={this.handleTopicChange} />
        <RB.Button onClick={() => this.props.onTopicSet(this.state.topicName)}>
          Create
        </RB.Button>
      </div>
    );
  }
}
