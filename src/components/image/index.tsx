import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

export default function ImageComponent({ src, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [ref, inView, entry] = useInView({
    rootMargin: '0px 0px 500px',
  });

  if (inView && !loaded) {
    // TODO Handle 404s
    const image = new Image();
    image.onload = () => setLoaded(true);
    image.src = src;
  }

  return loaded ? (
    <img ref={ref} src={src} {...props} />
  ) : (
    <div ref={ref} className="video-item__thumb video-item__thumb--preview" />
  );
}
