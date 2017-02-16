import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_VIDEOS,
  requestVideos,
  receiveVideos
} from './actions';

function* fetchVideos(action) {
  try {
    const videos = yield call(fetch, `/api/videos/${subreddit}/${filter}`, { method: 'GET' });
      videos.then(response => response.json())
      // .then(json => dispatch(receiveVideos(subreddit, filter, json)))
    // const videos = yield call(Api.fetchUser, action.payload.userId);
    // yield put({ type: 'RECEIVE_VIDEOS', videos });
    yield put(receiveVideos(videos));
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* requestVideosSaga() {
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
