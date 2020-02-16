import React, { StrictMode } from 'react';
import { hydrate, render } from 'react-dom';
import Document from './components/document/hot';
import './main.css';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

declare global {
  interface NodeModule {
    hot: any;
  }
}

const renderMethod = !!module.hot ? render : hydrate;
renderMethod(
  <StrictMode>
    <Document preloadedState={preloadedState} />
  </StrictMode>,
  document.getElementById('root'),
);
