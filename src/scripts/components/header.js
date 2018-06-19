import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Menu from './menu';

const Header = ({ value, onChange, options }) => (
  <header className="header">
    <img
      className="logo"
      onClick={() => onChange('videos')}
      src="/img/vose.svg"
      alt="vose.tv"
    />
    <Menu />
  </header>
);

export default Header;
