import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Provider } from 'unstated';
import { Subscribe } from 'unstated';
import StateContainer from './state-container';
import Header from '../header';
import Videos from '../videos';
import Player from '../player';
// TODO Check if needed
import dropdownContainer from '../dropdown/container';
import Link from '../link';
import favorites from '../../../favorite-subreddits';

// TODO Extract error element into component.
const Document = () => (
  <React.StrictMode>
    <Provider inject={[dropdownContainer]}>
      <Header />
      <Subscribe to={[StateContainer]}>
        {({ state }) =>
          state.videos && state.videos.length === 0 ? (
            <div className="message">
              <div className="message__icon">
                <canvas id="static" width="80" height="60" />
              </div>
              <div className="message__content">
                <p>
                  <b>We couldn't find any videos for you...</b>
                </p>
                <p>
                  Try a different sorting, or some of our favorite subreddits:
                </p>
                <ul>
                  {favorites
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map(link => (
                      <li>
                        <Link to={link}>{link}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <Player />
              <Videos />
            </React.Fragment>
          )
        }
      </Subscribe>
    </Provider>
  </React.StrictMode>
);

export default hot(module)(Document);
