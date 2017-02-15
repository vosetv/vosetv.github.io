import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchVideos(action) {
  try {
    const videos = yield call(Api.fetchUser, action.payload.userId);
    yield put({ type: 'RECEIVE_VIDEOS', videos });
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

export function* requestVideos() {
  yield takeLatest('REQUEST_VIDEOS', fetchVideos);
}

// TODO Save watched videos
// if a user is logged in this will be done with an api request
// if (localStorage.getItem('watchedVideos') !== null) {
//   videos = JSON.parse(localStorage.getItem('watchedVideos'));
// }
// videos[action.id] = true;
// localStorage.setItem('watchedVideos', JSON.stringify(videos));
