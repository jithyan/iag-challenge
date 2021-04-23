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

export function* startNewGameSagaWatcher() {
  yield takeLatest(START_NEW_GAME, startNewGameSagaWorker);
}

export function* verifyAttemptSagaWorker(action: IVerifyAttemptAction) {
  const { hint, guess } = action.payload;
  if (guess.length === 0) {
    yield put(setError("Attempt cannot be empty!"));
    return;
  }

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
    yield put(setError(""));

    if (response.data.correct === true) {
      yield put(setCorrect(true));
    } else {
      const { highlight, answer } = response.data;
      yield put(addAttempt({ highlight, answer }));
    }
  } catch (error) {
    yield put(setError(API_FAIL_MSG));
  }
}

export function* verifyAttemptSagaWatcher() {
  yield takeLatest(VERIFY_ATTEMPT, verifyAttemptSagaWorker);
}

export function* rootSaga() {
  yield all([startNewGameSagaWatcher(), verifyAttemptSagaWatcher()]);
}
