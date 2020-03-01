import React from 'react';
import YouTube from '../youtube';
import shortNumber from '../short-number';
import { NormalizedVideoItem } from '../../services/fetch-subreddit';
import styles from './styles.css';

export default function Player({ video, next }) {
  return (
    <div className={styles.player}>
      <div className={styles.embed} id="player-embed">
        {video && (
          <YouTube
            videoId={video.id}
            opts={{
              playerVars: {
                autoplay: 1,
                color: 'white',
                start: video.timestamp,
              },
            }}
            onEnd={next}
          />
        )}
      </div>
      {video ? (
        <>
          <header className={styles.header}>
            <h1 data-testid="player-title" className={styles.title}>
              <a
                href={`https://redd.it/${video.url}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {video.title}
              </a>
            </h1>
            {video.flair && <div className={styles.flair}>{video.flair}</div>}
          </header>
          <footer className={styles.footer}>
            <a
              className={styles.comments}
              href={`https://redd.it/${video.url}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {shortNumber(video.comments)} comments
            </a>
            <div className={styles.score}>
              Score: {shortNumber(video.score)}
            </div>
          </footer>
        </>
      ) : (
        <>
          <header className={styles.header}>
            <div className={styles.titlePlaceholder} />
          </header>
          <footer className={styles.footer}>
            <div className={styles.commentsPlaceholder} />
          </footer>
        </>
      )}
    </div>
  );
}
