import get from 'lodash.get';
import { combineReducers } from 'redux';
import {
  CHANGE_VIDEO,
  CHANGE_FILTER,
  WATCH_VIDEO,
  RECEIVE_VIDEOS,
  REQUEST_VIDEOS,
} from './actions';

/**
 * Store should be a respresentation of the app's state
 * do not use it as memory
 * store cached subreddits in indexdb or localstorage
 * store: {
 *   videos: array
 *   currentVideo: number or obj
 *   filter: {
 *     subreddit: string
 *     sort: string
 *   }
 *   isFetching: bool
 *   watchedVideos: array
 * }
 */

function videos(state = [], action) {
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return action.videos;
    default:
      return state;
  }
}

function currentVideo(state, action) {
  switch (action.type) {
    case CHANGE_VIDEO:
      return action.video;
    case CHANGE_FILTER:
      return 0;
    default:
      return state;
  }
}

function filter(state = {
  subreddit: 'videos',
  sort: 'hot',
}, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, action.filter };
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return false,
    case REQUEST_VIDEOS:
      return true;
    default:
      return state;
  }
}

function watchedVideos(state = [], action) {
  switch (action.type) {
    case WATCH_VIDEO:
      return [...state, action.id];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  videos,
  currentVideo,
  filter,
  isFetching,
  watchedVideos,
});

export default rootReducer;
