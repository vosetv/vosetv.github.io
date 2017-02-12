import React, { Component, PropTypes } from 'react';
import Dropdown from './dropdown';

export default class Header extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { value, onChange, onFilterChange, options, filter } = this.props;

    return (
      <div className="header">
        <div className="logo"><img onClick={() => onChange('videos')} src="/img/vose.svg" alt="vose.tv" /></div>
        <div className="filter">
          Subreddit: <Dropdown options={options} value={value} onChange={onChange} />
          Sort by: <Dropdown options={['hot', 'top', 'new']} value={filter} onChange={onFilterChange} />
        </div>
      </div>
    );
  }
}
