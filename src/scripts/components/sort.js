import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';

const Sort = () => (
  <div className="sort">
    <div className="sort__text">Sort</div>
    <button className="button sort__button">videos</button>
    <button className="button sort__button">Hot</button>
  </div>
);

export default Sort;
