import path from 'path';
import express from 'express';
import compression from 'compression';
import getVideos from './getVideos';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

/**
 * Set templates and views folder
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('view cache', true);
app.disable('view cache');

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy');
  app.use(compression({
    threshold: false,
  }));
} else {
  app.use(express.static(path.join(__dirname, '../../public')));
}

getVideos(app);

app.use((req, res) => res.status(200).render('index.ejs', {
  gacode: process.env.GA_CODE,
}));

/**
 * Start server
 */
app.listen(port);
