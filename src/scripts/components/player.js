import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

// TODO: videos watched first gets updated here once we get video on ready, but we should try to get it before.
// Props:
// timestamp
const Player = ({ video, onEnd, selectedVideo, onVideoWatch }) => (
  <div className="player">
    <div className="player-embed" id="player-embed">
      {video ? (
        <YouTube
          videoId={video.id}
          opts={{
            playerVars: {
              autoplay: 1,
              start: video.timestamp,
            },
          }}
          onEnd={() => onEnd(selectedVideo + 1)}
          onReady={() => onVideoWatch(video.id)}
        />
      ) : null}
    </div>
    <header className="player-header">
      {video ? (
        <h1 className="player-title">
          <a href={`https://reddit.com${video.url}`} target="_blank">
            {video.title}
          </a>
        </h1>
      ) : <div className="player-title--preview" />}
      {/* TODO Null operator here */}
      {video &&
        video.flair && <div className="player-flair">{video.flair}</div>}
    </header>
    <footer className="player-footer">
      {video ? (
        <>
          <a
            className="player-comments"
            href={`https://reddit.com${video.url}`}
            target="_blank"
          >
            {video.comments} comments
          </a>
          <div className="player-score">Score: {video.score}</div>
        </>
      ) : <div className="player-comments--preview" />}
    </footer>
  </div>
);

export default Player;
