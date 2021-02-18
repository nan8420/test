import React from 'react';
import configureStore from './store/configureStore'
import {Provider} from 'react-redux';
import {App} from './src/index';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
