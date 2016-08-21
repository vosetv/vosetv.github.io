function getTimestamp(url) {
  const match = url.match(/(?:#|&|\?)t=(\d+h)?(\d+m)?(\d+(?:s|$))?/);

  if (match === null) return 0;

  const hours = (parseInt(match[1], 10) * 3600 || 0);
  const minutes = (parseInt(match[2], 10) * 60 || 0);
  const seconds = (parseInt(match[3], 10) || 0);

  return hours + minutes + seconds;
}

export function unique(a) {
  const seen = {};
  return a.filter((video) => seen[video.id] === true ? false : (seen[video.id] = true));
}

export function normalizeVideos(videos) {
  return videos.map(video => {
    let id;
    if (video.secure_media.oembed.url) {
      id = video.secure_media.oembed.url.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&\?]*).*/)[1];
    } else if (video.secure_media.oembed.thumbnail_url) {
      id = video.secure_media.oembed.thumbnail_url.split('/')[4];
    }
    return {
      url: video.permalink,
      id,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      title: video.title,
      timestamp: getTimestamp(video.url),
      subreddit: video.subreddit.display_name,
      date: video.created,
      nsfw: video.over_18,
      flair: video.link_flair_text,
      comments: video.num_comments,
      score: video.score,
    };
  });
}

export function fetchMore(listing) {
  const videoLimit = 50;

  // Return if we already have more than 25 videos
  const check = listing.filter(post => (
      post.secure_media &&
      post.secure_media.type === 'youtube.com' &&
      post.over_18 === false
    )
  );
  if (check.length > videoLimit) return check;

  const count = 0;
  function recursiveGet(posts, depth) {
    return posts.fetch_more({ amount: 100 }).then(morePosts => {
      const vids = morePosts.filter(post => (
          post.secure_media &&
          post.secure_media.type === 'youtube.com' &&
          post.over_18 === false
        )
      );
      if (vids.length > videoLimit || depth >= 7) {
        return Promise.resolve(vids);
      }
      return Promise.reject({ msg: 'next', listing: morePosts });
    });
  }
  return recursiveGet(listing, count);
}
