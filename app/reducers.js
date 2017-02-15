import get from 'lodash.get';
import { combineReducers } from 'redux';
import {
  SELECT_VIDEO,
  SELECT_FILTER,
  INVALIDATE_SUBREDDIT,
  REQUEST_VIDEOS,
  RECEIVE_VIDEOS,
  VIDEO_WATCH,
} from './actions';

export function videoWatchReducer(state = {}, action) {
  let videos;
  switch (action.type) {
    case VIDEO_WATCH:
      if (localStorage.getItem('watchedVideos') === null) {
        videos = {};
      } else {
        videos = JSON.parse(localStorage.getItem('watchedVideos'));
      }
      videos[action.id] = true;
      localStorage.setItem('watchedVideos', JSON.stringify(videos));
      return videos;
    default:
      return state;
  }
}

function selectedVideo(state = 0, action) {
  switch (action.type) {
    case SELECT_VIDEO:
      return action.video;
    case SELECT_FILTER: // Reset selected video on filter change
      return 0;
    default:
      return state;
  }
}

function selectedSubreddit(state = 'videos', action) {
  switch (action.type) {
    case SELECT_FILTER:
      return action.subreddit;
    default:
      return state;
  }
}

function selectedFilter(state = 'hot', action) {
  switch (action.type) {
    case SELECT_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function getVideos(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_VIDEOS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_VIDEOS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.videos,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}

function videosBySubreddit(state = {
  hot: {},
  top: {},
  new: {},
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_VIDEOS:
    case REQUEST_VIDEOS:
      return {
        ...state,
        [action.filter]: {
          [action.subreddit]: getVideos(get(state, [action.filter, action.subreddit]), action),
        },
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  videosBySubreddit,
  watchedVideos: videoWatchReducer,
  selectedSubreddit,
  selectedFilter,
  selectedVideo,
});

export default rootReducer;
