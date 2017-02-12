import React, { PropTypes } from 'react';
import Dropdown from './dropdown';

const Header = ({ value, onChange, onFilterChange, options, filter }) =>
  <div className="header">
    <div className="logo">
      <img onClick={() => onChange('videos')} src="/img/vose.svg" alt="vose.tv" />
    </div>
    <div>Filter v</div>
    <div className="filter">
      Subreddit: <Dropdown options={options} value={value} onChange={onChange} />
      Sort by: <Dropdown options={['hot', 'top', 'new']} value={filter} onChange={onFilterChange} />
    </div>
  </div>;

Header.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Header;
