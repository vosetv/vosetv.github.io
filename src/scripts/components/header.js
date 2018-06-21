import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Sort from './sort';
import Logo from './logo';

const Header = ({ value, onChange, options }) => (
  <header className="header">
    <Logo
      className="logo"
      onClick={() => onChange('videos')}
    />
    <Sort />
  </header>
);

export default Header;
