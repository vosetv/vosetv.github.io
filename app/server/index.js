import path from 'path';
import express from 'express';
import compression from 'compression';
import nodalytics from 'nodalytics';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import App from '../components/app';
import configureStore from '../configureStore';
import refreshVideos from './refreshVideos';
import { apiRouter } from './api';
import hotVideos from './hotVideos';

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
  app.use(nodalytics(process.env.GA_CODE_SERVER));
} else {
  app.use(express.static(path.join(__dirname, '../../public')));
}

app.use('/api/videos', apiRouter);

app.use((req, res) => {
  const subreddit = req.path.replace(/\/{2,}/, '/').split('/')[2] || 'videos';
  const sort = req.path.replace(/\/{2,}/, '/').split('/')[3] || 'hot';
  // TODO Time
  let store;
  if (hotVideos[subreddit.toLowerCase()]) {
    store = configureStore({
      filter: { subreddit, sort },
      isFetching: false,
      videos: hotVideos[subreddit.toLowerCase()],
      currentVideo: 0,
    });
  } else {
    store = configureStore({
      filter: { subreddit, sort },
      currentVideo: 0,
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
