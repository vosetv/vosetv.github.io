import React from 'react';
import Link from '../link';
import favorites from '../../data/favorite-subreddits';
import styles from './styles.module.css';

export default function Message({ error }) {
  return (
    <div className={styles.container}>
      <div>
        <p>
          <b>We couldn’t find any videos for you...</b>
        </p>
        <p>Try a different sorting, or some of our favorite subreddits:</p>
        <ul>
          {/* TODO Make this work with serverside rendering */}
          {favorites
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((subreddit) => (
              <li key={subreddit}>
                <Link to={subreddit}>{`/r/${subreddit}`}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
