import subreddits from '../subreddits';
import { fetchSubreddit } from './util';

export const hotVideos = {};

function refreshVids() {
  for (const subreddit of subreddits) {
    fetchSubreddit(subreddit)
      .then(videos => {
        hotVideos[subreddit.toLowerCase()] = videos;
      })
      .catch(err => console.log(err));
  }
  setTimeout(refreshVids, 300000);
}

export function getVideos(app) {
  refreshVids();

  app.get('/api/videos/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit.toLowerCase();
    if (subreddit in hotVideos) {
      res.json(hotVideos[subreddit]);
    } else {
      fetchSubreddit(subreddit)
        .then(videos => res.json(videos))
        .catch(err => console.log(err));
    }
  });
}
