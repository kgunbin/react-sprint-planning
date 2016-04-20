import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class User extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    vote: React.PropTypes.string,
    showVotes: React.PropTypes.bool
  }
  renderVote = () => {
    var ret;

    if (this.props.vote) {
      if (this.props.showVotes) {
        ret = (<div>{this.props.vote}</div>);
      } else {
        ret = (<div className='hidden-vote'>!</div>);
      }
    } else {
      ret = (<div className='no-vote'>?</div>);
    }
    return ret;
  }
  render() {
    return (
      <Row>
        <Col md={4}>
          <h5>{this.props.username}</h5>
        </Col>
        <Col md={1}>
          {this.renderVote()}
        </Col>
      </Row>
    );
  }
}
