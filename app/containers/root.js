import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './app';

const subreddit = location.pathname.split('/')[2] || 'videos';
document.title = `vose.tv - /r/${subreddit}`;
history.replaceState({}, null, `/r/${subreddit}`);
const store = configureStore({
  selectedSubreddit: subreddit,
});

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
