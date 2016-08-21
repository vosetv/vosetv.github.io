import React from 'react';
import { render } from 'react-dom';
import 'element.scrollintoviewifneeded-polyfill';
import Root from '../containers/root';

render(
  <Root />,
  document.getElementById('root')
);
