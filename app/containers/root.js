import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './app';

const store = configureStore(window.__PRELOADED_STATE__);
const subreddit = window.__PRELOADED_STATE__.selectedSubreddit;
document.title = `vose.tv - /r/${subreddit}`;
history.replaceState({}, null, `/r/${subreddit}`);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
