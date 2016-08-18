import fetch from 'isomorphic-fetch';

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS';
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const SELECT_VIDEO = 'SELECT_VIDEO';
export const WATCHED_VIDEO = 'WATCHED_VIDEO';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const VIDEO_TIME = 'VIDEO_TIME';

export function videoTime(id, percent) {
  return {
    type: VIDEO_TIME,
    id,
    percent,
  };
}

export function selectVideo(video) {
  return {
    type: SELECT_VIDEO,
    video,
  };
}

export function selectSubreddit(subreddit, pushState) {
  if (pushState === true) {
    document.title = `vose.tv - /r/${subreddit}`;
    history.pushState({}, null, `/r/${subreddit}`);
  }
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestVideos(subreddit) {
  return {
    type: REQUEST_VIDEOS,
    subreddit,
  };
}

function receiveVideos(subreddit, json) {
  return {
    type: RECEIVE_VIDEOS,
    subreddit,
    videos: json,
    receivedAt: Date.now(),
  };
}

function fetchVideos(subreddit) {
  return dispatch => {
    dispatch(requestVideos(subreddit));
    return fetch(`/api/videos/${subreddit}`, { method: 'GET' })
      .then(response => response.json())
      .then(json => dispatch(receiveVideos(subreddit, json)));
      // .catch(err => {
      //   console.error('Fetch Videos Error:', err);
      // });
  };
}

function shouldFetchVideos(state, subreddit) {
  const videos = state.videosBySubreddit[subreddit];
  if (!videos) {
    return true;
  } else if (videos.isFetching) {
    return false;
  }
  return videos.didInvalidate;
}

export function fetchVideosIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchVideos(getState(), subreddit)) {
      return dispatch(fetchVideos(subreddit));
    }
    // TODO Figure out what to return here (we have it just to please the linter).
    return false;
  };
}
