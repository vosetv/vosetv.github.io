import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader'
import { Provider } from 'unstated';
import Header from './header';
import Videos from './videos';
import Player from './player';

/*
 * TODO: Error screen, suggest new subreddits.
 * We couldn't find any videos for you...
 * Try some of our favourites:
 *   - /r/artisanvideos
 *   - /r/shittyrobots
 *   - ...
 */
const App = () => (
  <>
    <Provider>
      <React.StrictMode>
        <Header />
        <Player />
        <Videos />
      </React.StrictMode>
    </Provider>
  </>
);

export default hot(module)(App);
