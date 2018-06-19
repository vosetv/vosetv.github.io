import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Video from './video';

// TODO Move preview into Video component?
const Videos = ({ videos }) =>
  videos ? (
    <ul className="video-list">
      {videos.map((video, i) => (
        <Video {...rest} video={video} key={i} index={i} />
      ))}
    </ul>
  ) : (
    <ul className="video-list video-list--preview">
      {[...Array(32)].map((_, i) => (
        <li className="video-item" key={i}>
          <div className="video-item__thumb" />
          <div className="video-item__title" />
        </li>
      ))}
    </ul>
  );

export default Videos;
