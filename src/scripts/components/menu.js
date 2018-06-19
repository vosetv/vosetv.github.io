import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import subreddits from '../../subreddits';

// TODO Make menu loadable

const Menu = ({ value, active }) => (
  <>
    {value && (
      <div className="menu__button">
        <h1 className="menu__subreddit">{value}</h1>
      </div>
    )}
    {active && (
      <div className="menu">
        <ul className="menu__dropdown">
          {subreddits.map(item => (
            <li
              key={item}
              className={objstr({
                menu__active: value === item,
              })}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default Menu;
