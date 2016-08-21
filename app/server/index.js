import path from 'path';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import App from '../containers/app';
import configureStore from '../configureStore';
import { getVideos, hotVideos } from './getVideos';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

/**
 * Set templates and views folder
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', true);

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy');
  app.use(compression({
    threshold: false,
  }));
} else {
  app.use(express.static(path.join(__dirname, '../../public')));
}

getVideos(app);

app.use((req, res) => {
  const subreddit = req.path.split('/')[2] || 'videos';
  let store;
  if (hotVideos[subreddit.toLowerCase()]) {
    store = configureStore({
      selectedSubreddit: subreddit,
      videosBySubreddit: {
        [subreddit]: {
          items: hotVideos[subreddit.toLowerCase()] || [],
          isFetching: false,
          didInvalidate: false,
          lastUpdated: Date.now(),
        },
      },
      selectedVideo: 0,
    });
  } else {
    store = configureStore({
      selectedSubreddit: subreddit,
      selectedVideo: 0,
    });
  }
  const reactHtml = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  res.status(200).render('index.ejs', {
    gacode: process.env.GA_CODE,
    reactHtml,
    preloadedState: JSON.stringify(store.getState()),
  });
});

/**
 * Start server
 */
app.listen(port);
