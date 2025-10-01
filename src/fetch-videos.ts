export default async function fetchVideos({ subreddit, sorting, timeRange }) {
  console.log(`/api/videos/${subreddit}/${sorting}/${timeRange}`);
  const res = await fetch(
    `https://www.reddit.com/r/${subreddit}/${sorting}.json?sort=${sorting}&t=${timeRange}&raw_json=1`,
  );
  const videos = await res.json();
  return videos;
}
