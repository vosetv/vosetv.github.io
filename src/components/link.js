import React from 'react';
import PropTypes from 'prop-types';

// TODO Just do onClick={sort({subreddit: to})}
const Link = ({ sort, to, children }) => (
  <a
    onClick={event => {
      event.preventDefault();
      sort({ subreddit: to });
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
