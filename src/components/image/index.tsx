import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../video-item/styles.css';

enum State {
  Empty,
  Loading,
  Ready,
  Error,
}

export default function ImageComponent({
  src,
  ...props
}: {
  src: string;
  className: string;
  alt: string;
}) {
  const [state, setLoaded] = useState<State>(State.Empty);
  const [ref, inView, enter] = useInView({
    rootMargin: '0px 0px 500px',
  });

  if (inView && state === State.Empty) {
    // TODO Handle 404s and errors
    setLoaded(State.Loading);
    const image = new Image();
    image.onload = () => setLoaded(State.Ready);
    image.src = src;
  }

  return state === State.Ready ? (
    <img ref={ref} src={src} {...props} />
  ) : (
    <div ref={ref} className={styles.thumbPlaceholder} />
  );
}
