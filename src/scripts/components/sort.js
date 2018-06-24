import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import Dropdown from './dropdown';
import StateContainer from './state-container';

const Sort = () => (
  <Subscribe to={[StateContainer]}>
    {store => (
      <div className="sort">
        <div className="sort__text">Sort</div>
        <Dropdown
          id={1}
          items={store.state.subreddits}
          activeItem={store.state.subreddit}
          onChange={store.setSubreddit}
        />
        <Dropdown
          id={2}
          items={store.state.sortOptions}
          activeItem={store.state.sort}
          onChange={store.setSort}
        />
      </div>
    )}
  </Subscribe>
);

export default Sort;
