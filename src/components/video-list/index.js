import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import VideoItem from '../video-item';
import './styles.css';

// States:
//  - With videos
//  - No filtered videos
//  - Empty
//  - Loading
const VideoList = ({ videos, watchedVideos, currentVideoIndex, setVideo }) => (
  <div
    className={objstr({
      'video-list': true,
      'video-list--preview': !videos,
    })}
  >
    {videos ? (
      videos.length ? (
        <ul className="list">
          {videos.map((video, i) => (
            <VideoItem
              key={video.id}
              index={i}
              id={video.id}
              title={video.title}
              isSelected={currentVideoIndex === i}
              isWatched={watchedVideos ? !!watchedVideos[video.id] : false}
              onClick={() => setVideo(i)}
            />
          ))}
        </ul>
      ) : (
        <div className="message">
          {/* TODO Is it even ever possible to get here? */}
          <p>No videos to show...</p>
        </div>
      )
    ) : (
      <ul className="list">
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

VideoList.propTypes = {
  videos: PropTypes.array,
  watchedVideos: PropTypes.objectOf(PropTypes.bool),
  currentVideoIndex: PropTypes.number,
  setVideo: PropTypes.func.isRequired,
};

export default VideoList;
