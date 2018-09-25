import React from 'react';
import PropTypes from 'prop-types';

// TODO Just do onClick={sort({subreddit: to})}
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
