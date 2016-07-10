import React from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';

export default class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
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
    const className = {
      'hidden-vote': this.props.vote && !this.props.showVotes,
      'no-vote': !this.props.vote,
      'current-user': this.props.me
    };

    return (
      <Row className={classnames(className)}>
        <Col md={4}>
          <h5>{this.props.user.name}</h5>
        </Col>
        <Col md={1}>
          {this.renderVote()}
        </Col>
      </Row>
    );
  }
}
