import subreddits from '../subreddits';
import fetchSubreddit from './fetchSubreddit';
import hotVideos from './hotVideos';

// TODO Store this in redis
async function refreshVids() {
  await Promise.all(subreddits.map(async (subreddit) => {
    const videos = await fetchSubreddit(subreddit);
    hotVideos[subreddit.toLowerCase()] = videos;
  }));
  const FIVE_MINUTES = 300000;
  setTimeout(refreshVids, FIVE_MINUTES);
}

export default refreshVids;
