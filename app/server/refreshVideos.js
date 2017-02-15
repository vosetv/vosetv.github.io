import subreddits from '../subreddits';
import fetchSubreddit from './fetchSubreddit';
import hotVideos from './hotVideos';

// TODO Store this in redis
export default async function refreshVids() {
  for (const subreddit of subreddits) {
    const videos = await fetchSubreddit(subreddit);
    hotVideos[subreddit.toLowerCase()] = videos;
  }
  const FIVE_MINUTES = 300000;
  setTimeout(refreshVids, FIVE_MINUTES);
}
