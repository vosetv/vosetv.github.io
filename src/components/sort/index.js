import React from 'react';
import { Subscribe } from '@simonlc/unstated';
import Dropdown from '../dropdown';
import StateContainer from '../state-container';
import './styles.css';

const Sort = () => (
  <Subscribe to={[StateContainer]}>
    {({ state, sort }) => (
      <div className="sort">
        <div className="sort__title">Sort</div>
        <Dropdown
          id="subreddit"
          items={state.subreddits}
          currentItem={state.subreddit}
          onChange={sort}
        />
        <Dropdown
          id="sort"
          items={state.sortOptions}
          currentItem={state.sort}
          onChange={sort}
        />
        {['top', 'controversial'].includes(state.sort) && (
          <Dropdown
            id="timeRange"
            items={state.timeRangeOptions}
            currentItem={state.timeRange}
            onChange={sort}
          />
        )}
      </div>
    )}
  </Subscribe>
);

export default Sort;
