import produce from "immer";
import {
  ADD_ATTEMPT,
  SET_CORRECT,
  SET_ERROR,
  SET_GUESS,
  SET_HINT,
  StateUpdateActions,
} from "./actions";

export interface IAttempt {
  highlight: string[];
  answer: string;
}

export interface IStoreState {
  error: string;
  correct: boolean;
  attempts: IAttempt[];
  guess: string;
  hint: string;
}

export const INITIAL_STATE: IStoreState = {
  error: "",
  correct: false,
  attempts: [],
  guess: "",
  hint: "",
};

export function rootReducer(
  state: IStoreState = INITIAL_STATE,
  action: StateUpdateActions
) {
  switch (action.type) {
    case ADD_ATTEMPT:
      return produce(state, (draft) => {
        draft.attempts.push(action.payload);
        draft.guess = "";
      });

    case SET_HINT:
      return produce(INITIAL_STATE, (draft) => {
        draft.hint = action.payload;
      });

    case SET_ERROR:
      return produce(state, (draft) => {
        draft.error = action.payload;
      });

    case SET_CORRECT:
      return produce(state, (draft) => {
        draft.correct = action.payload;
      });

    case SET_GUESS:
      return produce(state, (draft) => {
        if (!/^\d+$/.test(action.payload) && action.payload.length > 0) {
          draft.error = "You can only enter digits!";
        } else if (
          new Set(state.guess.split("")).size ===
          new Set(action.payload.split("")).size
        ) {
          draft.error = "Digits entered have to be unique!";
        } else {
          draft.error = "";
          draft.guess = action.payload;
        }
      });

    default:
      return state;
  }
}
