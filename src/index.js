import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

import store from './redux/store';
import {Provider} from 'react-redux';

const rootEl = document.getElementById('app');

ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));
