import path from 'path';
import express from 'express';
import compression from 'compression';
import nodalytics from 'nodalytics';

import { getVideos, hotVideos } from './get-videos';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy');
  app.use(compression({
    threshold: false,
  }));
  app.use(nodalytics(process.env.GA_CODE_SERVER));
} else {
  app.use(express.static(path.join(__dirname, '../../.public')));
}

getVideos(app);

app.use((req, res) => {
  res.status(200).send(`
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>vose.tv - /r/videos</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta id="theme-color" name="theme-color" content="#20262b">
<link rel="stylesheet" href="/main.css">
<body>
<div id="root" class="app"></div>
<div id="modal"></div>
<script src="/bundle.js"></script>
<script>window.main()</script>
`);
});

/**
 * Start server
 */
app.listen(port);
