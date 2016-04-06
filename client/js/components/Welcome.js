mport React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Button>Create new session</Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Input type='text' />
          </Col>
          <Col md={4}>
            <Button bsStyle='primary'>Join</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
