import Snoowrap from 'snoowrap';
import subreddits from '../subreddits';
import { unique, fetchMore, normalizeVideos } from './util';

// TODO: Add get and set that stores key in lower.
const hotVideos = {};

function getVideos(app) {
  const r = new Snoowrap({
    user_agent: process.env.USER_AGENT,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: process.env.REFRESH_TOKEN,
  });

  function refreshVids() {
    for (const subreddit of subreddits) {
      r.get_hot(subreddit)
        .then(fetchMore)
        .then(videos => {
          hotVideos[subreddit.toLowerCase()] = unique(normalizeVideos(videos));
        })
        .catch(err => console.log(err));
    }
    setTimeout(refreshVids, 300000);
  }
  refreshVids();

  app.get('/api/videos/:subreddit', (req, res) => {
    if (req.params.subreddit.toLowerCase() in hotVideos) {
      res.json(hotVideos[req.params.subreddit.toLowerCase()]);
    } else {
      r.get_hot(req.params.subreddit)
        .then(fetchMore)
        .then(videos => res.json(unique(normalizeVideos(videos))))
        .catch(err => console.log(err));
    }
  });
}

export {
  hotVideos,
  getVideos,
};
