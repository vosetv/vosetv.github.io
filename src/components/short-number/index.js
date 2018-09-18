import React from 'react';
import PropTypes from 'prop-types';

function shortNumber(number) {
  return number >= 1e3
    ? (number / 1e3).toFixed(number >= 1e5 ? 0 : 1) + 'k'
    : number;
}

const ShortNumber = ({ children }) => shortNumber(children);

ShortNumber.PropTypes = {
  children: PropTypes.any.isRequired,
};

export default ShortNumber;
