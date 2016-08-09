import { combineReducers } from 'redux';
import {
  SELECT_VIDEO,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_VIDEOS,
  RECEIVE_VIDEOS,
  VIDEO_TIME,
} from './actions';

export function videoTimeReducer(state = {}, action) {
  let videos;
  switch (action.type) {
    case VIDEO_TIME:
      if (localStorage.getItem('watchedVideos') === null) {
        videos = {};
      } else {
        videos = JSON.parse(localStorage.getItem('watchedVideos'));
      }
      // if (action.percent === 100) {
      videos[action.id] = true;
      // } else if (videos[action.id] !== true) {
      //   videos[action.id] = action.percent;
      // }
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
    default:
      return state;
  }
}

function selectedSubreddit(state = 'videos', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
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

function videosBySubreddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_VIDEOS:
    case REQUEST_VIDEOS:
      return {
        ...state,
        [action.subreddit]: getVideos(state[action.subreddit], action),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  videosBySubreddit,
  watchedVideos: videoTimeReducer,
  selectedSubreddit,
  selectedVideo,
});

export default rootReducer;
