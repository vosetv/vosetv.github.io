import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ buttonText, onChange }) => (
  <button className="button sort__button">{buttonText}</button>
);

export default Dropdown;
