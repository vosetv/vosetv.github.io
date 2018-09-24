import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ to, children }) => (
  <a
    onClick={event => {
      event.preventDefault();
      history.pushState({}, '', to);
    }}
    href={to}
  >
    {children}
  </a>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
