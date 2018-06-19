import React from 'react';
import { hydrate, render } from 'react-dom';
import Loadable from 'react-loadable';
import Document from './components/document';

window.main = () => {
  Loadable.preloadReady().then(() => {
    const renderMethod = !!module.hot ? render : hydrate;
    renderMethod(<Document />, document.getElementById('root'));
  });
};
