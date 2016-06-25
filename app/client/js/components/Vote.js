import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

class Vote extends React.Component {
  static propTypes = {
    handleVote: React.PropTypes.func
  }
  onVote = (vote) => {
    this.props.handleVote(vote)
  }
  render() {
    var buttons = [];
    
    for (let n of [0.5, 1, 2, 3, 5, 8, 12, 20, 40, 100]) {
      buttons.push(
        <Button key={`button_${n}`}
          onClick={this.onVote.bind(this, n)}>{n}</Button>
      );
    }

    return (
      <div>
       {buttons}
      </div>
    );
  }
}

export default Vote;
