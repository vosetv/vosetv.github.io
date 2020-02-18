import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../dropdown';
import './styles.css';

import { SortProps, Sort as SortType } from '../video-provider';

export default function Sort({
  subreddits,
  sortOptions,
  timeRangeOptions,
  state,
  sort,
}: SortProps & SortType) {
  return (
    <div className="sort">
      <div className="sort__title">Sort</div>
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
    </div>
  );
}

Sort.propTypes = {
  subreddits: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeRangeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,

  state: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
    sorting: PropTypes.string.isRequired,
    timeRange: PropTypes.string,
  }),

  sort: PropTypes.func.isRequired,
};
