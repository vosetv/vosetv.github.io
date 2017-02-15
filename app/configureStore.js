import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { requestVideos } from './sagas'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware,
    ),
  );
}

sagaMiddleware.run(requestVideos);
