import React from 'react';
import Sort from '../sort';
import Logo from '../logo';
import './styles.css';

const Header = ({ sort, getSortProps }) => (
  <header className="header">
    <Logo onClick={() => sort({ subreddit: 'videos' })} />
    <Sort sort={sort} {...getSortProps()} />
  </header>
);

export default Header;
