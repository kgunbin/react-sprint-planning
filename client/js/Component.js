import React from 'react';
import io from 'socket.io-client';

var socket = io('http://localhost:3009', {query: 'room=123'});

var Component = React.createClass({
  getInitialState() {
    return {
      messages: ['Empty here']
    };
  },
  componentDidMount() {
    socket.on('connect', this._handleInit);
    socket.on('user:join', this._handleJoin);
  },
  _handleInit(data) {
    this._addMessage('Connected');
  },
  _handleJoin(data) {
    this._addMessage('User joined: ' + data.user);
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
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default Component;
