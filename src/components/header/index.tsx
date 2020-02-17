import React from 'react';
import Sort from '../sort';
import Logo from '../logo';
import './styles.css';

import { SortProps, Sort as SortType } from '../video-provider';

interface HeaderProps extends SortType {
  getSortProps: () => SortProps;
}

export default function Header({ sort, getSortProps }: HeaderProps) {
  return (
    <header className="header">
      <Logo onClick={() => sort({ subreddit: 'videos' })} />
      <Sort sort={sort} {...getSortProps()} />
    </header>
  );
}
