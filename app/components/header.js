import React, { PropTypes } from 'react';
import subreddits from '../subreddits';
import { selectFilter } from '../actions';

export const Header = ({ value, onChange, onFilterChange, options, filter }) =>
  <div className="header">
    <div className="logo">
      <img onClick={() => onChange('videos')} src="/img/vose.svg" alt="vose.tv" />
    </div>
    <div>Filter v</div>
  </div>;

Header.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default connect(state => ({
}), dispatch => ({

  handleChange: (nextSubreddit) => {
    dispatch(selectFilter(nextSubreddit, null, true));
  },

  handleFilterChange: (nextFilter) => {
    dispatch(selectFilter(null, nextFilter, true));
  },

}))(Header);
