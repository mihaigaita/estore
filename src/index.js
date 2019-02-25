import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppSmart from './containers/AppSmart';
import * as serviceWorker from './serviceWorker';
import configureAppStore from './other/storeConfig';
import { Provider } from 'react-redux';

//import data from './api/db.json';
let store = configureAppStore();

let renderApp = () => ReactDOM.render(
  <Provider store = {store}>
    <AppSmart />
  </Provider>,
  document.getElementById('root')
);

// This allows webpack to reload the app after components and index.css
// code changes while keeping the current state
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers/AppSmart', renderApp);
  module.hot.accept('./index.css', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
