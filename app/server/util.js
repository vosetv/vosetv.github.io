function getTimestamp(url) {
  const match = url.match(/(?:#|&|\?)t=(\d+h)?(\d+m)?(\d+(?:s|$))?/);

  if (match === null) return 0;

  const hours = (parseInt(match[1], 10) * 3600 || 0);
  const minutes = (parseInt(match[2], 10) * 60 || 0);
  const seconds = (parseInt(match[3], 10) || 0);

  return hours + minutes + seconds;
}

// TODO Make these more fp
function filter(item) {
  return (item.data.secure_media &&
  item.data.secure_media.type === 'youtube.com' &&
  item.data.over_18 === false);
}

function unique(a) {
  const seen = {};
  return a.filter((video) => seen[video.id] === true ? false : (seen[video.id] = true));
}

function normalizeVideos(videos) {
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
      flair: video.data.link_flair_text,
      comments: video.data.num_comments,
      score: video.data.score,
    };
  });
}

export function fetchSubreddit(subreddit) {
  const videoLimit = 50;
  const count = 0;
  let videos = [];

  function recursiveGet(depth, after) {
    const url = after
      ? `https://reddit.com/r/${subreddit}.json?raw_json=1&count=${count * 100}&after=${after}`
      : `https://reddit.com/r/${subreddit}.json?raw_json=1`;
    return fetch(url)
      .then(response => response.json())
      .then(posts => {
        videos = videos.concat(posts.data.children.filter(filter));
        if (videos.length > videoLimit || depth >= 8) {
          return Promise.resolve(unique(normalizeVideos(videos)));
        }
        return Promise.reject({ msg: 'next', after: posts.data.after });
      })
      .catch(err => {
        if (err.msg === 'next') {
          return recursiveGet(depth + 1, err.after);
        }
        return console.error('Recursive Videos Error', err);
      });
  }
  return recursiveGet(count);
}
