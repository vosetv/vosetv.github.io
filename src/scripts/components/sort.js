import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import objstr from 'obj-str';
import State from './state';

const Sort = () => (
  <Subscribe to={[State]}>
    {({ state }) =>
      <div className="sort">
        <div className="sort__text">Sort</div>
        <button className="button sort__button">{state.subreddit}</button>
        <button className="button sort__button">{state.sort}</button>
      </div>
    }
  </Subscribe>
);

export default Sort;
