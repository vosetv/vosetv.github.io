import React from 'react';
import PropTypes from 'prop-types';
import { Sort } from './video-provider';

export default function Link({
  sort,
  to,
  children,
}: Sort & { to: string; children: React.ReactNode }) {
  return (
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
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
