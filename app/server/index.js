import path from 'path';
import express from 'express';
import getVideos from './getVideos';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

/**
 * Set templates and views folder
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO: Temp for dev
app.use(express.static(path.join(__dirname, '../../public')));

getVideos(app);

app.use((req, res) => res.status(200).render('index.ejs'));

/**
 * Start server
 */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
