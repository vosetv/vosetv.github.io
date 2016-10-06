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
    if (video.data.secure_media.oembed.url) {
      id = video.data.secure_media.oembed.url.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&\?]*).*/)[1];
    } else if (video.data.secure_media.oembed.thumbnail_url) {
      id = video.data.secure_media.oembed.thumbnail_url.split('/')[4];
    }
    return {
      url: video.data.permalink,
      id,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      title: video.data.title,
      timestamp: getTimestamp(video.data.url),
      subreddit: video.data.subreddit.display_name,
      date: video.data.created,
      nsfw: video.data.over_18,
      flair: video.data.link_flair_text,
      comments: video.data.num_comments,
      score: video.data.score,
    };
  });
}

export function fetchMore(listing, subreddit) {
  const videoLimit = 50;

  // Return if we already have more than 25 videos
  const check = listing.data.children.filter(post => (
      post.data.secure_media &&
      post.data.secure_media.type === 'youtube.com' &&
      post.data.over_18 === false
    )
  );
  if (check.length > videoLimit) return check;

  const count = 0;
  function recursiveGet(posts, depth) {
    return fetch(`https://reddit.com/r/${subreddit}.json?count=100&after=${posts.data.after}`)
      .then(response => response.json())
      .then(morePosts => {
        // TODO Dry
        morePosts.data.children = posts.data.children.concat(morePosts.data.children);
        const vids = morePosts.data.children.filter(post => (
            post.data.secure_media &&
            post.data.secure_media.type === 'youtube.com' &&
            post.data.over_18 === false
          )
        );
        if (vids.length > videoLimit || depth >= 7) {
          return Promise.resolve(vids);
        }
        return Promise.reject({ msg: 'next', listing: morePosts });
      })
      .catch(err => {
        if (err.msg === 'next') return recursiveGet(err.listing, depth + 1);
        return console.error('Recursive Videos Error', err);
      });
  }
  return recursiveGet(listing, count);
}
