import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Provider } from 'unstated';
import { Subscribe } from 'unstated';
import StateContainer from '../state-container';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';
// TODO Check if needed
import dropdownContainer from '../dropdown/container';

// TODO Extract error element into component.
let Document = () => (
  <React.StrictMode>
    <Provider inject={[dropdownContainer]}>
      <Header />
      <Subscribe to={[StateContainer]}>
        {({ state }) =>
          state.videos && state.videos.length === 0 ? (
            <Message />
          ) : (
            <React.Fragment>
              <Player />
              <VideoList />
            </React.Fragment>
          )
        }
      </Subscribe>
    </Provider>
  </React.StrictMode>
);

export default hot(module)(Document);
