import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Image from '../image';
import './styles.css';

export default function VideoItem({
  id,
  title,
  isSelected,
  isWatched,
  onClick,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (isSelected === true) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isSelected]);

  const classes = objstr({
    'video-item': true,
    'video-item--selected': isSelected,
    'video-item--watched': isWatched,
  });
  return (
    <li ref={ref} className={classes} onClick={onClick}>
      <Image
        className="video-item__thumb"
        src={`https://i.ytimg.com/vi/${id}/default.jpg`}
        alt=""
      />
      <div className="video-item__title">{title}</div>
    </li>
  );
}

VideoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isWatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
