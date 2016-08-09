import React from 'react';
import { render } from 'react-dom';
import Root from '../containers/root';
import 'element.scrollintoviewifneeded-polyfill';

render(
  <Root />,
  document.getElementById('root')
);
