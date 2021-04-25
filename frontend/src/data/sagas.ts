import { all, takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  setHint,
  setError,
  START_NEW_GAME,
  IVerifyAttemptAction,
  setCorrect,
  addAttempt,
  VERIFY_ATTEMPT,
} from "./actions";

export interface INewPasswordResponse {
  hint: string;
}

export interface IVerifyPasswordResponse {
  correct: boolean;
  highlight?: string[];
  hint: string;
  answer: string;
}

export const API_FAIL_MSG = "Sorry! The API failed on us.";

export function* startNewGameSagaWorker() {
  try {
    const response: AxiosResponse<INewPasswordResponse> = yield call(
      axios.get,
      "http://localhost:5000/new-password"
    );

    yield put(setHint(response.data.hint));
  } catch (error) {
    yield put(setError(API_FAIL_MSG));
  }
}

export function* verifyAttemptSagaWorker(action: IVerifyAttemptAction) {
  const { hint, guess } = action.payload;
  if (guess.length === 0) {
    yield put(setError("Attempt cannot be empty!"));
    return;
  }

  try {
    const response: AxiosResponse<IVerifyPasswordResponse> = yield call(
      axios.post,
      "http://localhost:5000/verify-password",
      {
        hint,
        answer: guess,
      }
    );
    const { correct, highlight = [], answer = "" } = response.data;
    yield put(setError(""));

    if (correct === true) {
      yield put(setCorrect(true));
    } else {
      yield put(addAttempt({ highlight, answer }));
    }
  } catch (error) {
    yield put(setError(API_FAIL_MSG));
  }
}

export function* verifyAttemptSagaWatcher() {
  yield takeLatest(VERIFY_ATTEMPT, verifyAttemptSagaWorker);
}

export function* startNewGameSagaWatcher() {
  yield takeLatest(START_NEW_GAME, startNewGameSagaWorker);
}

export function* rootSaga() {
  yield all([startNewGameSagaWatcher(), verifyAttemptSagaWatcher()]);
}
