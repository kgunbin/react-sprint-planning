import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Container from './components/Container';
import reducers from './reducers';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import config from '../../shared/config';

let socket = io(`${config.RSP_PROTOCOL}://${config.RSP_HOST}:${config.RSP_PORT}`);

let socketMiddleware = createSocketIoMiddleware(socket, 'SERVER_');
let store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, socketMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
