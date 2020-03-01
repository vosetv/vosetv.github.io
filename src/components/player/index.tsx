import React from 'react';
import YouTube from '../youtube';
import shortNumber from '../short-number';
import { NormalizedVideoItem } from '../../services/fetch-subreddit';
import './styles.css';

export default function Player({
  currentVideo,
  next,
}: {
  currentVideo: NormalizedVideoItem | null;
  next: () => void;
}) {
  return (
    <div className="player">
      <div className="player-embed" id="player-embed">
        {currentVideo ? (
          <YouTube
            videoId={currentVideo.id}
            opts={{
              playerVars: {
                autoplay: 1,
                color: 'white',
                start: currentVideo.timestamp,
              },
            }}
            onEnd={next}
          />
        ) : null}
      </div>
      {currentVideo ? (
        <>
          <header className="player-header">
            <h1 data-testid="player-title" className="player-title">
              <a
                href={`https://redd.it/${currentVideo.url}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {currentVideo.title}
              </a>
            </h1>
            {currentVideo.flair && (
              <div className="player-flair">{currentVideo.flair}</div>
            )}
          </header>
          <footer className="player-footer">
            <a
              className="player-comments"
              href={`https://redd.it/${currentVideo.url}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {shortNumber(currentVideo.comments)} comments
            </a>
            <div className="player-score">
              Score: {shortNumber(currentVideo.score)}
            </div>
          </footer>
        </>
      ) : (
        <>
          <header className="player-header">
            <div className="player-title--preview" />
          </header>
          <footer className="player-footer">
            <div className="player-comments--preview" />
          </footer>
        </>
      )}
    </div>
  );
}
