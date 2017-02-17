import React from 'react';
import { Provider } from 'react-redux';

import App from './app';

import configureStore, { sagaMiddleware } from '../configureStore';
import rootSaga from '../sagas';

const store = configureStore(window.PRELOADED_STATE);
// TODO Integration test
const subreddit = window.PRELOADED_STATE.filter.subreddit;

sagaMiddleware.run(rootSaga);

document.title = `vose.tv - /r/${subreddit}`;
history.replaceState({}, null, `/r/${subreddit}`);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
