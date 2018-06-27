import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import { Subscribe } from 'unstated';
import StateContainer from './state-container';
import Video from './video';
import Filter from './filter';
import Link from './link';

// TODO Ensure visible state
// States:
//  - With videos
//  - No filtered videos
//  - Empty
//  - Loading
const Videos = ({ videos, currentVideoIndex, changeVideo }) => (
  <Subscribe to={[StateContainer]}>
    {({ state, changeVideo }) => (
      <div
        className={objstr({
          'video-list': true,
          'video-list--preview': !state.videos,
        })}
      >
        <Filter />
        {state.videos ? (
          state.videos.length ? (
            <ul className="list-bare">
              {state.videos.map((video, i) => (
                <Video
                  ensureVisible={false}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  isSelected={state.currentVideoIndex === i}
                  isWatched={!!state.watchedVideos[video.id]}
                  onClick={() => changeVideo(i)}
                  key={video.id}
                  index={i}
                />
              ))}
            </ul>
          ) : (
            <div className="message">
              <p>We couldn't find any videos for you...</p>
              <p>Try a different sorting, or some of our favorites:</p>
              <ul>
                <li><Link to="/r/artisanvideos">/r/artisanvideos</Link></li>
                <li><Link to="/r/shittyrobots">/r/shittyrobots</Link></li>
                <li><Link to="/r/shittyrobots">/r/shittyrobots</Link></li>
                <li><Link to="/r/shittyrobots">/r/shittyrobots</Link></li>
              </ul>
            </div>
          )
        ) : (
          <ul className="list-bare">
            {[...Array(32)].map((_, i) => (
              <li className="video-item" key={i}>
                <div className="video-item__thumb" />
                <div className="video-item__title" />
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </Subscribe>
);

export default Videos;
