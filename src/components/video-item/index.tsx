import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import objstr from 'obj-str';
import Image from '../image';
import styles from './styles.module.css';

interface Props {
  id: string;
  title: string;
  isSelected: boolean;
  isWatched: boolean;
  onClick: (event: MouseEventInit) => void;
}

// TODO Use enum for isSelected, isWatched, untouched

export function Preview() {
  return (
    <li className={styles.placeholder}>
      <div className={styles.thumbPlaceholder} />
    </li>
  );
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
    [styles.item]: true,
    [styles.selected]: isSelected,
    [styles.watched]: isWatched,
  });
  return (
    <li ref={handleRef} className={classes} onClick={onClick}>
      <Image
        className={styles.thumb}
        src={`https://i.ytimg.com/vi/${id}/default.jpg`}
        alt=""
      />
      <div className={styles.title}>{title}</div>
    </li>
  );
}
