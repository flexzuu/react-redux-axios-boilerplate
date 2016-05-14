require('./style/font-awesome/css/font-awesome.css');
require('./style/bootstrap.css');
require('./style/dashboard.css');
require('./style/style.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('root')
);
