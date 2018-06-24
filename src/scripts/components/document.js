import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from './header';
import Videos from './videos';
import Player from './player';
import { Provider } from 'unstated';

/*
 * TODO: Error screen, suggest new subreddits.
 * We couldn't find any videos for you...
 * Try some of our favourites:
 *   - /r/artisanvideos
 *   - /r/shittyrobots
 *   - ...
 */
const Document = () => (
  <React.StrictMode>
    <Provider>
      <Header />
      <Player />
      <Videos />
    </Provider>
  </React.StrictMode>
);

export default hot(module)(Document);
