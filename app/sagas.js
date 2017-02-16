import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_VIDEOS,
  requestVideos,
  receiveVideos
} from './actions';

function* fetchVideos(action) {
  try {
    const response = yield call(fetch, `/api/videos/${subreddit}/${filter}`, { method: 'GET' });
    const videos = yield response.json();
    yield put(receiveVideos(videos));
  } catch (e) {
    console.log('we threw in the fetch saga');
  }
}

function* watchFetchVideos() {
  yield takeLatest(REQUEST_VIDEOS, fetchVideos);
}

// TODO Save watched videos
// if a user is logged in this will be done with an api request
// if (localStorage.getItem('watchedVideos') !== null) {
//   videos = JSON.parse(localStorage.getItem('watchedVideos'));
// }
// videos[action.id] = true;
// localStorage.setItem('watchedVideos', JSON.stringify(videos));

export default function* rootSaga() {
  yield [
    requestVideosSaga(),
  ];
}
