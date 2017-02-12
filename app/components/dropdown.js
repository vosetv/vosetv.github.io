import React, { Component } from 'react';
import classnames from 'classnames';

export default class Dropdown extends Component {
  static propTypes = {
  }

  state = {
    active: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOut);
  }

  componentWillUnmount() {
    document.addEventListener('click', this.handleClickOut);
  }

  handleClick = () => {
    if (this.state.active === true) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
  }

  handleClickOut = event => {
    if (['dropdown', 'dropdown__value'].includes(event.target.className)) return;
    this.setState({ active: false });
  }

  render() {
    const { value, onChange, options } = this.props;
    const classes = classnames('dropdown', { 'dropdown--opened': this.state.active });

    return (
      <div style={{ display: 'inline-block' }}>
        <div className={classes}>
          <ul className="dropdown__items">
            {options.map(option =>
              <li
                key={option}
                className={value === option ? 'dropdown__item--active' : null}
                onClick={() => onChange(option)}
              >
                {option}
              </li>
            )}
          </ul>
        </div>
        <div className="dropdown__button" onClick={this.handleClick}>
          <div className="dropdown__value">{value}</div>
        </div>
      </div>
    );
  }
}
