import 'intersection-observer';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import Document from './components/document';
import './main.css';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

render(
  <StrictMode>
    <Document preloadedState={preloadedState} />
  </StrictMode>,
  document.getElementById('root'),
);
