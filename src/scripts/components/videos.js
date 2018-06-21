import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Video from './video';

// TODO Empty state
// TODO Ensure visible state
// States:
//  - With videos
//  - No filtered videos
//  - Empty
//  - Loading
const Videos = ({ videos }) =>
  videos ? (
    <ul className="video-list">
      {videos.map((video, i) => (
        <Video
          ensureVisible={video}
          title={video.title}
          thumbnail={video.thumbnail}
          isSelected={false}
          isWatched={false}
          key={i}
          index={i}
        />
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
