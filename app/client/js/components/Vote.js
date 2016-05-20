import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

function* next() {
  let current = 0;
  let next = 1;

  while (next < 100) {
    yield current;
    [current, next] = [next, current + next];
  }
}

class Vote extends React.Component {

  render() {
    var buttons = [];
    for (let n of next()) {
      buttons.push(
        <div>{n}</div>
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
