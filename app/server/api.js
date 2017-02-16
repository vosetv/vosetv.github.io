import { Router } from 'express';
import fetchSubreddit from './fetchSubreddit';
import hotVideos from './hotVideos';

export const apiRouter = Router();

apiRouter.get('/:subreddit/top/:time', async (req, res) => {
  console.log('top', req.params.subreddit, req.params.time);
  const subreddit = req.params.subreddit.toLowerCase();
  if (subreddit in hotVideos) {
    return res.json(hotVideos[subreddit]);
  } else {
    const videos = await fetchSubreddit(subreddit);
    return res.json(videos);
  }
});

apiRouter.get('/:subreddit/:sort', async (req, res) => {
  console.log('sorted', req.params.subreddit, req.params.sort);
  const subreddit = req.params.subreddit.toLowerCase();
  const sort = req.params.sort.toLowerCase();
  const videos = await fetchSubreddit(subreddit, sort);
  return res.json(videos);
});

apiRouter.get('/:subreddit', async (req, res) => {
  console.log('hot', req.params.subreddit);
  const subreddit = req.params.subreddit.toLowerCase();
  if (subreddit in hotVideos) {
    return res.json(hotVideos[subreddit]);
  } else {
    const videos = await fetchSubreddit(subreddit);
    return res.json(videos);
  }
});
