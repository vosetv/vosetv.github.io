import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Sort from '../sort';
import Logo from '../logo';
import './styles.css';

const Header = () => (
  <header className="header">
    <Logo />
    <Sort />
  </header>
);

export default Header;
