import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import Document from './components/document';
import './main.css';

import { NormalizedVideoItem } from './services/fetch-subreddit';
import { State } from './components/video-provider';

declare global {
  interface Window {
    __PRELOADED_STATE__: State;
  }
}

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

render(
  <StrictMode>
    <Document preloadedState={preloadedState} />
  </StrictMode>,
  document.getElementById('root'),
);
