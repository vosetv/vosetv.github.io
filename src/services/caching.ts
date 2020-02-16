import fetchSubreddit from './fetch-subreddit';
import subreddits from '../data/subreddits';

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
refreshVids();
