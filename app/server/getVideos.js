import subreddits from '../subreddits';
import Snoowrap from 'snoowrap';
import { unique, fetchMore, normalizeVideos } from './util';

export default function getVideos(app) {
  const r = new Snoowrap({
    user_agent: process.env.USER_AGENT,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const hotVideos = {};

  function refreshVids() {
    for (const subreddit of subreddits) {
      r.get_hot(subreddit)
        .then(fetchMore)
        .then(videos => {
          hotVideos[subreddit] = unique(normalizeVideos(videos));
        });
    }
    setTimeout(refreshVids, 300000);
  }
  refreshVids();

  app.get('/api/videos/:subreddit', (req, res) => {
    if (req.params.subreddit in hotVideos) {
      res.json(hotVideos[req.params.subreddit]);
    } else {
      r.get_hot(req.params.subreddit)
        .then(fetchMore)
        .then(videos => res.json(unique(normalizeVideos(videos))));
    }
  });
}
