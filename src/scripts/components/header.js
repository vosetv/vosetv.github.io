import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Sort from './sort';
import Logo from './logo';

const Header = () => (
  <header className="header">
    <Logo className="logo" />
    <Sort />
  </header>
);

export default Header;
