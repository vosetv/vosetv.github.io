import React from 'react';

function shortNumber(number) {
  return number >= 1e3
    ? (number / 1e3).toFixed(number >= 1e5 ? 0 : 1) + 'k'
    : number;
}

const ShortNumber = ({ children }) => shortNumber(children);

export default ShortNumber;
