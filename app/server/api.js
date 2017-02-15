import { Router } from 'express';
import fetchSubreddit from './fetchSubreddit';
import hotVideos from './hotVideos';

export const apiRouter = Router();

apiRouter.get('/videos/:subreddit/top/:time', async (req, res) => {
  console.log('top', req.params.subreddit, req.params.time);
  const subreddit = req.params.subreddit.toLowerCase();
  if (subreddit in hotVideos) {
    return res.json(hotVideos[subreddit]);
  } else {
    const videos = await fetchSubreddit(subreddit);
    return res.json(videos);
  }
});

apiRouter.get('/videos/:subreddit/:filter', async (req, res) => {
  console.log('filtered', req.params.subreddit, req.params.filter);
  const subreddit = req.params.subreddit.toLowerCase();
  const filter = req.params.filter.toLowerCase();
  const videos = await fetchSubreddit(subreddit, filter);
  return res.json(videos);
});

apiRouter.get('/videos/:subreddit', async (req, res) => {
  console.log('hot', req.params.subreddit);
  const subreddit = req.params.subreddit.toLowerCase();
  if (subreddit in hotVideos) {
    return res.json(hotVideos[subreddit]);
  } else {
    const videos = await fetchSubreddit(subreddit);
    return res.json(videos);
  }
});
