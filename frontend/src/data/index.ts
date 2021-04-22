import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

export function createNewStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
