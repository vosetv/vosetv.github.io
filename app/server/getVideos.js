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

  app.get('/api/videos/:subreddit/top/:time', (req, res) => {
    console.log('top', req.params.subreddit, req.params.time);
    const subreddit = req.params.subreddit.toLowerCase();
    if (subreddit in hotVideos) {
      res.json(hotVideos[subreddit]);
    } else {
      fetchSubreddit(subreddit)
        .then(videos => res.json(videos))
        .catch(err => console.log(err));
    }
  });

  app.get('/api/videos/:subreddit/:filter', (req, res) => {
    console.log('filtered', req.params.subreddit, req.params.filter);
    const subreddit = req.params.subreddit.toLowerCase();
    const filter = req.params.filter.toLowerCase();
    fetchSubreddit(subreddit, filter)
      .then(videos => res.json(videos))
      .catch(err => console.log(err));
  });

  app.get('/api/videos/:subreddit', (req, res) => {
    console.log('hot', req.params.subreddit);
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
