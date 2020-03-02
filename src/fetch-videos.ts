const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}`
    : 'https://vose.tv';

export default async function fetchVideos({ subreddit, sorting, timeRange }) {
  console.log(`${baseUrl}/api/videos/${subreddit}/${sorting}/${timeRange}`);
  const res = await fetch(
    `${baseUrl}/api/videos/${subreddit}/${sorting}/${timeRange}`,
  );
  const videos = await res.json();
  return videos;
}
