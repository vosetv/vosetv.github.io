import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import ensureVisible from './ensure-visible';

const Video = ({ thumbnail, title, isSelected, isWatched, onClick }) => {
  const classes = objstr({
    'video-item': true,
    'video-item--selected': isSelected,
    'video-item--watched': isWatched,
  });
  return (
    <li className={classes} onClick={onClick}>
      <img className="video-item__thumb" src={thumbnail} alt="" />
      <div className="video-item__title">{title}</div>
    </li>
  );
};

Video.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isWatched: PropTypes.bool.isRequired,
  ensureVisible: PropTypes.bool.isRequired,
};

export default ensureVisible(Video);
