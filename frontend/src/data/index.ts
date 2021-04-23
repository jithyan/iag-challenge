import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

export function createNewStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV === "development"
      ? applyMiddleware(logger, sagaMiddleware)
      : applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
