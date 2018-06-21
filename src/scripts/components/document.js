import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types';
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
    <React.StrictMode>
      <Header />
      <Player />
      <Videos />
    </React.StrictMode>
  </>
);

export default hot(module)(App);
