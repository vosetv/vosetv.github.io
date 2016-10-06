import subreddits from '../subreddits';
import { unique, fetchMore, normalizeVideos } from './util';

const hotVideos = {};

function refreshVids() {
  for (const subreddit of subreddits) {
    fetch(`https://reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(response => fetchMore(response, subreddit))
      .then(videos => {
        hotVideos[subreddit.toLowerCase()] = unique(normalizeVideos(videos));
      })
      .catch(err => console.log(err));
  }
  setTimeout(refreshVids, 300000);
}

function getVideos(app) {
  refreshVids();

  app.get('/api/videos/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit.toLowerCase();
    if (subreddit in hotVideos) {
      res.json(hotVideos[subreddit]);
    } else {
      fetch(`https://reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(response => fetchMore(response, subreddit))
        .then(videos => res.json(unique(normalizeVideos(videos))))
        .catch(err => console.log(err));
    }
  });
}

export {
  hotVideos,
  getVideos,
};
