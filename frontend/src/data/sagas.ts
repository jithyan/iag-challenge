import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  addAttemp,
  IVerifyAttemptAction,
  setCorrect,
  setError,
  setHint,
  START_NEW_GAME,
  VERIFY_ATTEMPT,
} from "./reducers";
import axios, { AxiosResponse } from "axios";

export interface INewPasswordResponse {
  hint: string;
}

export function* startNewGameSagaWorker() {
  try {
    const response: AxiosResponse<INewPasswordResponse> = yield call(
      axios.get,
      "http://localhost:5000/new-password"
    );

    yield put(setHint(response.data.hint));
  } catch (error) {
    yield put(setError(true));
  }
}

export function* startNewGameSagaWatcher() {
  yield takeLatest(START_NEW_GAME, startNewGameSagaWorker);
}

export function* verifyAttemptSagaWorker(action: IVerifyAttemptAction) {
  const { hint, guess } = action.payload;
  try {
    const response: AxiosResponse<{
      correct: boolean;
      highlight?: string[];
      hint: string;
      answer: string;
    }> = yield call(axios.post, "http://localhost:5000/verify-password", {
      hint,
      answer: guess,
    });
    yield put(setError(false));

    if (response.data.correct === true) {
      yield put(setCorrect(true));
    } else {
      const { highlight, answer } = response.data;
      yield put(addAttemp({ highlight, answer }));
    }
  } catch (error) {
    yield put(setError(true));
  }
}

export function* verifyAttemptSagaWatcher() {
  yield takeLatest(VERIFY_ATTEMPT, verifyAttemptSagaWorker);
}

export function* rootSaga() {
  yield all([startNewGameSagaWatcher(), verifyAttemptSagaWatcher()]);
}
