import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './app';

const store = configureStore(window.PRELOADED_STATE);
const subreddit = window.PRELOADED_STATE.selectedSubreddit;

document.title = `vose.tv - /r/${subreddit}`;
history.replaceState({}, null, `/r/${subreddit}`);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
