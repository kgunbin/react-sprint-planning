import React from 'react';
import * as RB from 'react-bootstrap';

export default class Topic extends React.Component {
  static propTypes = {
    onTopicSet: React.PropTypes.func.isRequired,
    topic: React.PropTypes.shape({
      description: React.PropTypes.string,
      votes: React.PropTypes.array
    })
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

  renderNoTopic = () => {
    return (
      <div>
        <RB.Input type='text' value={this.state.topicName} onChange={this.handleTopicChange} />
        <RB.Button onClick={() => this.props.onTopicSet(this.state.topicName)}>
          Create
        </RB.Button>
      </div>
    );
  }

  renderTopic = () => {
    return (
      <div>
        <h3>{this.props.topic.description}</h3>
      </div>
    );
  }

  render() {
    return this.props.topic.description == null ? this.renderNoTopic() : this.renderTopic();
  }
}
