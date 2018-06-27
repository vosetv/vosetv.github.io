import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Provider } from 'unstated';
import Header from './header';
import Videos from './videos';
import Player from './player';
import dropdownContainer from './dropdown-container';

const Document = () => (
  <React.StrictMode>
    <Provider inject={[dropdownContainer]}>
      <Header />
      <Player />
      <Videos />
    </Provider>
  </React.StrictMode>
);

export default hot(module)(Document);
