import React, { useState } from 'react';
import Observer from 'react-intersection-observer';
import PropTypes from 'prop-types';

export default function ImageComponent({ src, ...props }) {
  const [loaded, setLoaded] = useState(false);
  function loadImage(inView) {
    if (!inView || loaded) return;
    // TODO Handle 404s
    const image = new Image();
    image.onload = () => setLoaded(true);
    image.src = src;
  }
  return (
    <Observer onChange={loadImage} rootMargin="0px 0px 500px">
      {({ ref }) =>
        loaded ? (
          <img ref={ref} src={src} {...props} />
        ) : (
          <div
            ref={ref}
            className="video-item__thumb video-item__thumb--preview"
          />
        )
      }
    </Observer>
  );
}
