import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import subreddits from '../subreddits';
import { selectFilter } from '../actions';

export const Header = ({ value, onChange, onFilterChange, options, filter }) =>
  <div className="header">
    <div className="logo">
      <img onClick={() => onChange('videos')} src="/img/vose.svg" alt="vose.tv" />
    </div>
    <div>Filter v</div>
  </div>;

export default connect(state => ({
}), dispatch => ({

  onChange: (nextSubreddit) => {
    dispatch(selectFilter(nextSubreddit, null, true));
  },

  handleFilterChange: (nextFilter) => {
    dispatch(selectFilter(null, nextFilter, true));
  },

}))(Header);
