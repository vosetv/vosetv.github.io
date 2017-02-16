import fetch from 'isomorphic-fetch';

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS';
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const CHANGE_VIDEO = 'CHANGE_VIDEO';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const WATCH_VIDEO = 'WATCH_VIDEO';

export function watchVideo(id) {
  return {
    type: WATCH_VIDEO,
    id,
  };
}

export function changeVideo(video) {
  return {
    type: CHANGE_VIDEO,
    video,
  };
}

export function changeFilter(filter, pushState) {

  // Side effects
  // Put in middelware?
  if (pushState === true) {
    if (filter.sort === 'hot') {
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
    type: CHANGE_FILTER,
    filter,
  };
}

export function receiveVideos(subreddit, sort, videos) {
  return {
    type: RECEIVE_VIDEOS,
    filter: { subreddit, sort },
    videos,
  };
}

export function requestVideos(filter) {
  return {
    type: REQUEST_VIDEOS,
    filter,
  };
}

// function fetchVideos(subreddit, filter = 'hot') {
//   return (dispatch) => {
//     dispatch(requestVideos(subreddit, filter));
//     return fetch(`/api/videos/${subreddit}/${filter}`, { method: 'GET' })
//       .then(response => response.json())
//       .then(json => dispatch(receiveVideos(subreddit, filter, json)))
//       .catch(err => {
//         console.error('Fetch Videos Error:', err);
//       });
//   };
// }

export function fetchVideosIfNeeded(subreddit, filter) {
  return dispatch => dispatch(fetchVideos(subreddit, filter));
}
