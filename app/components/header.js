import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import subreddits from '../subreddits';
import { changeFilter } from '../actions';

export const Header = ({ value, handleFilterChange, onFilterChange, options, filter }) =>
  <div className="header">
    <div className="logo">
      <img onClick={() => handleFilterChange('videos', 'hot')} src="/img/vose.svg" alt="vose.tv" />
    </div>
    <div>Filter v</div>
  </div>;

export default connect(state => ({
}), dispatch => ({

  handleFilterChange: (subreddit = null, sort = null) => {
    dispatch(changeFilter({ subreddit, sort }, true));
  },

}))(Header);
