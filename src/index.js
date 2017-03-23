import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import initialState from './state';
import routes from './routes';

import Root from './root';

const store = configureStore(window.initialState || initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root
    store={store}
    history={history}
    routes={routes} />,
  document.getElementById('root')
);
