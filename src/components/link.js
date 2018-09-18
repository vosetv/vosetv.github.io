import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import StateContainer from './state-container';

const Link = ({ to, children }) => (
  <Subscribe to={[StateContainer]}>
    {({ historyUpdate }) => (
      <a
        onClick={event => {
          event.preventDefault();
          history.pushState({}, '', to);
          historyUpdate();
        }}
        href={to}
      >
        {children}
      </a>
    )}
  </Subscribe>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
