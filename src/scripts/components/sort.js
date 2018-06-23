import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import Dropdown from './dropdown';
import StateContainer from './state-container';

const Sort = () => (
  <Subscribe to={[StateContainer]}>
    {store => (
      <div className="sort">
        <div className="sort__text">Sort</div>
        <Dropdown buttonText={store.state.subreddit} onChange={store.setSubreddit} />
        <Dropdown buttonText={store.state.sort} onChange={store.setSort} />
      </div>
    )}
  </Subscribe>
);

export default Sort;
