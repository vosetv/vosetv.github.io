import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  handleClick = event => {
    event.preventDefault();
    history.pushState(null, null, this.props.to);
  };
  render() {
    return (
      <a onClick={this.handleClick} href={this.props.to}>
        {this.props.children}
      </a>
    );
  }
}

export default Link;
