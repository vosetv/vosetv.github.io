import fetchSubreddit from './fetch-subreddit';
import subreddits from '../data/subreddits';
import { NormalizedVideoItem, Dictionary } from './fetch-subreddit';

export const hotVideos: Dictionary<NormalizedVideoItem[]> = {};

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
refreshVids();
