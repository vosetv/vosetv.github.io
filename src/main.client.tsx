import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import Document from './components/document';
import './main.css';

import { NormalizedVideoItem } from './services/fetch-subreddit';

export type PreloadedState = {
  videos: NormalizedVideoItem[];
  subreddit: string;
  sorting: string;
  timeRange: string;
  currentVideo: NormalizedVideoItem;
};

declare global {
  interface Window {
    __PRELOADED_STATE__: PreloadedState;
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
