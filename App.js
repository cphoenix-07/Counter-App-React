/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider } from 'react-redux';
import CounterApp from './CounterApp';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}
