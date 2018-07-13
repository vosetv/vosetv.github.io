import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import Dropdown from '../dropdown';
import StateContainer from '../state-container';
import './styles.css';

const Sort = () => (
  <Subscribe to={[StateContainer]}>
    {store => (
      <div className="sort">
        <div className="sort__title">Sort</div>
        <Dropdown
          id="subreddit"
          items={store.state.subreddits}
          activeItem={store.state.subreddit}
          onChange={store.sort}
        />
        <Dropdown
          id="sort"
          items={store.state.sortOptions}
          activeItem={store.state.sort}
          onChange={store.sort}
        />
        {['top', 'controversial'].includes(store.state.sort) && (
          <Dropdown
            id="timeRange"
            items={store.state.timeRangeOptions}
            activeItem={store.state.timeRange}
            onChange={store.sort}
          />
        )}
      </div>
    )}
  </Subscribe>
);

export default Sort;
