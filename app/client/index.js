import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'element.scrollintoviewifneeded-polyfill';
import Root from '../components/root';

render(
  <Root />,
  document.getElementById('root')
);
