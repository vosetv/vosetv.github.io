import React from 'react';
import Sort from '../sort';
import Logo from '../logo';
import Dropdown from '../dropdown';
import { SortProps, Sort as SortType } from '../video-provider';
import './styles.css';

export default function Header({
  sort,
  subreddits,
  sortOptions,
  timeRangeOptions,
  state,
}: SortProps & SortType) {
  return (
    <header className="header">
      <Logo onClick={() => sort({ subreddit: 'videos' })} />
      <Sort>
        <Dropdown
          id="subreddit"
          items={subreddits}
          currentItem={state.subreddit!}
          onChange={sort}
        />
        <Dropdown
          id="sorting"
          items={sortOptions}
          currentItem={state.sorting!}
          onChange={sort}
        />
        {['top', 'controversial'].includes(state.sorting!) && (
          <Dropdown
            id="timeRange"
            items={timeRangeOptions}
            currentItem={state.timeRange!}
            onChange={sort}
          />
        )}
      </Sort>
    </header>
  );
}
