import fetch from 'isomorphic-fetch';

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS';
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const SELECT_VIDEO = 'SELECT_VIDEO';
export const WATCHED_VIDEO = 'WATCHED_VIDEO';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const SELECT_FILTER = 'SELECT_FILTER';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const VIDEO_WATCH = 'VIDEO_WATCH';

export function videoWatch(id) {
  return {
    type: VIDEO_WATCH,
    id,
  };
}

export function selectVideo(video) {
  return {
    type: SELECT_VIDEO,
    video,
  };
}

// export function selectSubreddit(subreddit, pushState) {
//   if (pushState === true) {
//     document.title = `vose.tv - /r/${subreddit}`;
//     history.pushState({}, null, `/r/${subreddit}`);
//     ga('set', 'page', `/r/${subreddit}`);
//     ga('send', 'pageview');
//   }
//   return {
//     type: SELECT_SUBREDDIT,
//     subreddit,
//   };
// }

export function selectFilter(subreddit, filter, pushState) {
  if (pushState === true) {
    if (filter === 'hot') {
      document.title = `vose.tv - /r/${subreddit}`;
      history.pushState({}, null, `/r/${subreddit}`);
      ga('set', 'page', `/r/${subreddit}`);
    } else {
      document.title = `vose.tv - /r/${subreddit}/${filter}`;
      history.pushState({}, null, `/r/${subreddit}/${filter}`);
      ga('set', 'page', `/r/${subreddit}/${filter}`);
    }
    ga('send', 'pageview');
  }
  return {
    type: SELECT_FILTER,
    subreddit,
    filter,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestVideos(subreddit, filter) {
  return {
    type: REQUEST_VIDEOS,
    subreddit,
    filter,
  };
}

function receiveVideos(subreddit, filter, videos) {
  return {
    type: RECEIVE_VIDEOS,
    subreddit,
    filter,
    videos,
    receivedAt: Date.now(),
  };
}

function fetchVideos(subreddit, filter = 'hot') {
  return dispatch => {
    dispatch(requestVideos(subreddit, filter));
    return fetch(`/api/videos/${subreddit}/${filter}`, { method: 'GET' })
      .then(response => response.json())
      .then(json => dispatch(receiveVideos(subreddit, filter, json)))
      .catch(err => {
        console.error('Fetch Videos Error:', err);
      });
  };
}

// function shouldFetchVideos(state, subreddit) {
//   const videos = state.videosBySubreddit[subreddit];
//   if (!videos) {
//     return true;
//   } else if (videos.isFetching) {
//     return false;
//   }
//   return videos.didInvalidate;
// }

export function fetchVideosIfNeeded(subreddit, filter) {
  return dispatch => dispatch(fetchVideos(subreddit, filter));
}
