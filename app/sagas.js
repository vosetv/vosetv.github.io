import { call, put, select , takeLatest, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_VIDEOS,
  WATCH_VIDEO,
  CHANGE_FILTER,
  receiveVideos,
} from './actions';

function* fetchVideos(action) {
  const {
    subreddit = select(state => state.filter.subreddit),
    sort = select(state => state.filter.sort),
  } = action.filter;
  const response = yield call(fetch, `/api/videos/${subreddit}/${sort}`, { method: 'GET' });
  const videos = yield response.json();
  yield put(receiveVideos(videos));
}

function* watchVideo({ id }) {
  const watchedVideos = select(state => state.watchedVideos); // TODO Get watchedvideos
  if (watchedVideos.includes(id) === false) {
    watchedVideos.push(id);
  }

  // Make sure we don't go over our local storage limit
  if (watchedVideos.length > 50000) {
    if (localStorage.getItem('watchedVideos') !== null) {
      videos = JSON.parse(localStorage.getItem('watchedVideos'));
    }
    watchedVideos.splice(0, 25000);
  }

  localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
}

function* requestVideosWatcher() {
  yield takeLatest(REQUEST_VIDEOS, fetchVideos);
}

function* watchVideoWatcher() {
  yield takeEvery(WATCH_VIDEO, watchVideo);
}

function* changeFilterWatcher() {
  yield takeLatest(CHANGE_FILTER, fetchVideos);
}

export default function* rootSaga() {
  yield [
    requestVideosWatcher(),
    watchVideoWatcher(),
    changeFilterWatcher(),
  ];
}
