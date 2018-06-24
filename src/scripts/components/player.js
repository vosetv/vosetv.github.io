import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { Subscribe } from 'unstated';
import StateContainer from './state-container';

const Player = () => (
  <Subscribe to={[StateContainer]}>
    {({ state, changeVideo }) => (
      <div className="player">
        <div className="player-embed" id="player-embed">
          {state.currentVideo ? (
            <YouTube
              videoId={state.currentVideo.id}
              opts={{
                playerVars: {
                  autoplay: 1,
                  start: state.currentVideo.timestamp,
                },
              }}
              onEnd={() => changeVideo(state.currentVideoIndex + 1)}
            />
          ) : null}
        </div>
        <header className="player-header">
          {state.currentVideo ? (
            <h1 className="player-title">
              <a href={`https://reddit.com${state.currentVideo.url}`} target="_blank">
                {state.currentVideo.title}
              </a>
            </h1>
          ) : <div className="player-title--preview" />}
          {/* TODO Null operator here */}
          {state.currentVideo &&
            state.currentVideo.flair && <div className="player-flair">{state.currentVideo.flair}</div>}
        </header>
        <footer className="player-footer">
          {state.currentVideo ? (
            <>
              <a
                className="player-comments"
                href={`https://reddit.com${state.currentVideo.url}`}
                target="_blank"
              >
                {state.currentVideo.comments} comments
              </a>
              <div className="player-score">Score: {state.currentVideo.score}</div>
            </>
          ) : <div className="player-comments--preview" />}
        </footer>
      </div>
    )}
  </Subscribe>
);

export default Player;
