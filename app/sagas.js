import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_VIDEOS,
  WATCH_VIDEO,
  receiveVideos,
} from './actions';

function* fetchVideos(action) {
  const { subreddit, sort } = action.filter;
  const response = yield call(fetch, `/api/videos/${subreddit}/${sort}`, { method: 'GET' });
  const videos = yield response.json();
  yield put(receiveVideos(videos));
}

function* watchVideo({ id }) {
  const watchedVideos = []; // TODO Get watchedvideos
  if (watchedVideos.includes(id) === false) {
    watchedVideos.push(id);
  }
  // Make sure we don't go over our local storage limit
  if (watchedVideos.length > 50000) {
    // TODO Splice array.
    watchedVideos.splice(0, 25000);
  }
  localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
}

function* watchFetchVideos() {
  yield takeLatest(REQUEST_VIDEOS, fetchVideos);
}

function* watchWatchVideo() {
  yield takeLatest(WATCH_VIDEO, watchVideo);
}

export default function* rootSaga() {
  yield [
    watchFetchVideos(),
    watchWatchVideo(),
  ];
}
