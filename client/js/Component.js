import React from 'react';
import io from 'socket.io-client';
import messageTypes from '../../common/constants';

const socket = io('http://localhost:3009');

var Component = React.createClass({
  getInitialState() {
    return {
      messages: ['Empty here']
    };
  },
  componentDidMount() {
    socket.on('connect', this._handleInit);
    socket.on(messageTypes.NEW_USER, this._handleJoin);
  },
  _handleInit(data) {
    this._addMessage('Connected');
  },
  _handleJoin(data) {
    this._addMessage('User joined: ' + data);
  },
  _addMessage(message) {
    var messages = this.state.messages;

    messages.push(message);
    this.setState({
      messages: messages
    });
  },
  render() {
    return (
      <div>
        {
          this.state.messages.map((m, i) => {
            return (
              <div key={i}>
                {m}
              </div>
            );
          })
        }
        <input type='button' onClick={() => socket.emit(messageTypes.NEW_ROOM, 'Room 1')} />
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default Component;
