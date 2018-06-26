import subreddits from '../subreddits';
import fetchSubreddit from './fetch-subreddit.js';

export const hotVideos = {};

const fiveMinutes = 300000;

function refreshVids() {
  for (const subreddit of subreddits) {
    fetchSubreddit(subreddit, 'hot')
      .then(videos => {
        hotVideos[subreddit.toLowerCase()] = videos;
      })
      .catch(err => console.log(err));
  }
  setTimeout(refreshVids, fiveMinutes);
}

export function getVideos(app) {
  refreshVids();

  app.get('/api/videos/:subreddit/:sort', (req, res) => {
    const subreddit = req.params.subreddit.toLowerCase();
    const sort = req.params.sort.toLowerCase();
    if (subreddit in hotVideos && sort === 'hot') {
      res.json(hotVideos[subreddit]);
    } else {
      fetchSubreddit(subreddit, sort)
        .then(videos => res.json(videos))
        .catch(err => console.log(err));
    }
  });

  app.get('/api/videos/:subreddit/:sort/:timeRange', (req, res) => {
    const subreddit = req.params.subreddit.toLowerCase();
    const sort = req.params.sort.toLowerCase();
    const timeRange = req.params.timeRange.toLowerCase();
    if (subreddit in hotVideos && sort === 'hot') {
      res.json(hotVideos[subreddit]);
    } else {
      fetchSubreddit(subreddit, sort, timeRange)
        .then(videos => res.json(videos))
        .catch(err => console.log(err));
    }
  });
}
