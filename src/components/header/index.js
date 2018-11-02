import React from 'react';
import Sort from '../sort';
import Logo from '../logo';
import './styles.css';

export default function Header({ sort, getSortProps }) {
  return (
    <header className="header">
      <Logo onClick={() => sort({ subreddit: 'videos' })} />
      <Sort sort={sort} {...getSortProps()} />
    </header>
  );
}
