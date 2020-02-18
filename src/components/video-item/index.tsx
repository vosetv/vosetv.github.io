import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Image from '../image';
import './styles.css';

interface Props {
  id: string;
  title: string;
  isSelected: boolean;
  isWatched: boolean;
  onClick: (event: MouseEventInit) => void;
}

export default function VideoItem({
  id,
  title,
  isSelected,
  isWatched,
  onClick,
}: Props) {
  const ref = useRef<HTMLLIElement>(null!);
  const [inViewRef, inView, entry] = useInView({
    threshold: 1,
  });

  function handleRef(node: HTMLLIElement) {
    ref.current = node;
    inViewRef(node);
  }

  useEffect(() => {
    if (isSelected && !inView) {
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
    <li ref={handleRef} className={classes} onClick={onClick}>
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
