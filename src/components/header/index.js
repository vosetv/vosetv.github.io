import React from 'react';
import Sort from '../sort';
import Logo from '../logo';
import './styles.css';

const Header = ({ getSortProps }) => (
  <header className="header">
    <Logo />
    <Sort {...getSortProps()} />
  </header>
);

export default Header;
