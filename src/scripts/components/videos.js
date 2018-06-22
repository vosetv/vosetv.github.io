import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import Video from './video';
import Filter from './filter';

// TODO Empty state
// TODO Ensure visible state
// States:
//  - With videos
//  - No filtered videos
//  - Empty
//  - Loading
const Videos = ({ videos }) => (
  <div
    className={objstr({
      'video-list': true,
      'video-list--preview': !videos,
    })}
  >
    <Filter />
    {videos ? (
      <ul>
        {videos.map((video, i) => (
          <Video
            ensureVisible={video}
            title={video.title}
            thumbnail={video.thumbnail}
            isSelected={false}
            isWatched={false}
            key={video.id}
            index={i}
          />
        ))}
      </ul>
    ) : (
      <ul>
        {[...Array(32)].map((_, i) => (
          <li className="video-item" key={i}>
            <div className="video-item__thumb" />
            <div className="video-item__title" />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Videos;
