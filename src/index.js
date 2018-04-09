import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

import configureStore from './redux/store';
import {Provider} from 'react-redux';

const rootEl = document.getElementById('app');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, rootEl);
