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

  const { subreddit, sort } = filter;

  // Side effects
  // Put in middelware?
  if (pushState === true) {
    if (sort === 'hot') {
      document.title = `vose.tv - /r/${subreddit}`;
      history.pushState({}, null, `/r/${subreddit}`);
      ga('set', 'page', `/r/${subreddit}`);
    } else {
      document.title = `vose.tv - /r/${subreddit}/${sort}`;
      history.pushState({}, null, `/r/${subreddit}/${sort}`);
      ga('set', 'page', `/r/${subreddit}/${sort}`);
    }
    ga('send', 'pageview');
  }

  return {
    type: CHANGE_FILTER,
    filter,
  };
}

export function receiveVideos(videos) {
  return {
    type: RECEIVE_VIDEOS,
    videos,
  };
}

export function requestVideos(filter) {
  return {
    type: REQUEST_VIDEOS,
    filter,
  };
}

export function fetchVideosIfNeeded(subreddit, filter) {
  return dispatch => dispatch(fetchVideos(subreddit, filter));
}
