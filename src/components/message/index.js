import React from 'react';
import Link from '../link';
import favorites from '../../data/favorite-subreddits';
import './styles.css';

const Message = () => (
  <div className="message">
    <div className="message__icon">
      <canvas id="static" width="80" height="60" />
    </div>
    <div className="message__content">
      <p>
        <b>We couldn’t find any videos for you...</b>
      </p>
      <p>Try a different sorting, or some of our favorite subreddits:</p>
      <ul>
        {favorites
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(link => (
            <li key={link}>
              <Link to={link}>{link}</Link>
            </li>
          ))}
      </ul>
    </div>
  </div>
);

export default Message;
