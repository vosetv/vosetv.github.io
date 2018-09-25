import React from 'react';
import path from 'path';
import express from 'express';
// import nodalytics from 'nodalytics';
import { renderToNodeStream } from 'react-dom/server';

import Document from './components/document';
import fetchSubreddit from './services/fetch-subreddit';
import { hotVideos } from './services/caching';

const script =
  process.env.NODE_ENV === 'production'
    ? require('../.public/parcel-manifest.json')['main.client.js']
    : '/main.client.development.js';
const styles =
  process.env.NODE_ENV === 'production'
    ? require('../.public/parcel-manifest.json')['styles.css']
    : '/main.client.development.css';

// // // Init express app
const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../.public/')));
// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy');
//   app.use(nodalytics(process.env.GA_CODE_SERVER));
// } else {
//   app.use(express.static(path.join(__dirname, '../.public')));
// }

// // // Endpoints
app.get('/api/videos/:subreddit/:sorting/:timeRange', async (req, res) => {
  const subreddit = req.params.subreddit.toLowerCase();
  const sorting = req.params.sorting.toLowerCase();
  const timeRange = req.params.timeRange.toLowerCase();
  if (subreddit in hotVideos && sorting === 'hot') {
    return res.json(hotVideos[subreddit]);
  } else {
    try {
      const videos = await fetchSubreddit(subreddit, sorting, timeRange);
      return await res.json(videos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  }
});

app.use(async (req, res) => {
  const [subreddit = 'videos', sorting = 'hot'] = req.path
    .replace(/\/{2,}/g, '/')
    .replace(/^\/|\/$/g, '')
    .split('/')
    .slice(1); // Remove "r"
  const timeRange = req.query.t;

  res.write(`<!doctype html><html lang="en"><meta charset="utf-8">
<title>/r/${subreddit} - vose.tv</title>
<link rel="preload" href="${script}" as="script">
<link rel="preload" href="https://www.youtube.com/iframe_api" as="script">`);
  // TODO preload youtube script
  // <link rel="icon" href="favicon.ico">
  // <link rel="icon" sizes="192x192" href="icon.png">
  res.write(`<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${styles}">
<meta name="description" content="Watch Reddit's top videos on vose.tv">
<meta id="theme-color" name="theme-color" content="#20262b">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@simonmlaroche">
<meta name="twitter:creator" content="@simonmlaroche">
<meta property="og:url" content="https://vose.tv">
<meta property="og:title" content="vose.tv">
<meta property="og:description" content="Watch Reddit's top videos on vose.tv">
<meta property="og:image" content="https://vose.tv/vose-card.png">
<meta property="og:type" content="website">
<meta property="fb:app_id" content="1725542221039137">
<body><div id="root" class="app">`);

  const videos = await fetchSubreddit(subreddit, sorting, timeRange);
  const preloadedState = {
    videos,
    subreddit,
    sorting,
    timeRange,
    currentVideo: videos[0],
  };
  const reactStream = renderToNodeStream(
    <Document preloadedState={preloadedState} />,
  );

  reactStream.pipe(
    res,
    { end: false },
  );

  reactStream.on('end', () => {
    res.write(`</div>
<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c',
    )}</script>
<script src="${script}"></script>`);
    res.end();
  });
});

/**
 * Start server
 */
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
