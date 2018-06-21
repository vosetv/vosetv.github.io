import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import ensureVisible from './ensure-visible';

const Video = ({ thumbnail, title, isSelected, isWatched }) => {
  const classes = objstr({
    'video-item': true,
    'video-item--selected': isSelected,
    'video-item--watched': isWatched,
  });
  return (
    <li className={classes}>
      <img className="video-item__thumb" src={thumbnail} alt="" />
      <div className="video-item__title">{title}</div>
    </li>
  );
};

Video.propTypes = {
  thumbnail: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  isSelected: Proptypes.bool.isRequired,
  isWatched: Proptypes.bool.isRequired,
  ensureVisible: Proptypes.bool.isRequired,
};

export default ensureVisible(Video);
