import React from 'react';
import { Provider, Subscribe } from '@simonlc/unstated';
import StateContainer from '../state-container';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';

// TODO Extract error element into component.
const Document = () => (
  <React.StrictMode>
    <Provider>
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

export default Document;
