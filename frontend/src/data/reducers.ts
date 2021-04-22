import produce from "immer";

export const INITIAL_STATE = {
  error: false,
  correct: false,
  attempts: [],
  guess: "",
  hint: "",
};

export interface IStoreState {
  error: boolean;
  correct: boolean;
  attempts: any[];
  guess: string;
  hint: string;
}

export const VERIFY_ATTEMPT = "passwordGame/VERIFY_ATTEMPT";
export const ADD_ATTEMPT = "passwordGame/ADD_ATTEMPT";
export const SET_GUESS = "passwordGame/SET_GUESS";
export const SET_ERROR = "passwordGame/SET_ERROR";
export const START_NEW_GAME = "passwordGame/START_NEW_GAME";
export const SET_HINT = "passwordGame/SET_HINT";
export const SET_CORRECT = "passwordGame/SET_CORRECT";

export interface ISetCorrect {
  type: typeof SET_CORRECT;
  payload: boolean;
}

export function setCorrect(correct: boolean) {
  return { type: SET_CORRECT, payload: correct };
}

export interface ISetHintAction {
  type: typeof SET_HINT;
  payload: string;
}
export interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: boolean;
}
export function setError(hasError: boolean) {
  return { type: SET_ERROR, payload: hasError };
}
export function setHint(hint: string) {
  return { type: SET_HINT, payload: hint };
}
export interface IVerifyAttemptAction {
  type: typeof VERIFY_ATTEMPT;
  payload: {
    hint: string;
    guess: string;
  };
}

export function verifyAttempt(args: {
  hint: string;
  guess: string;
}): IVerifyAttemptAction {
  return { type: VERIFY_ATTEMPT, payload: args };
}
export interface IStartNewGameAction {
  type: typeof START_NEW_GAME;
}
export function startNewGame() {
  return { type: START_NEW_GAME };
}
export interface IAddAttemptAction {
  type: typeof ADD_ATTEMPT;
  payload: any;
}

export function addAttemp(attempt: any): IAddAttemptAction {
  return { type: ADD_ATTEMPT, payload: attempt };
}
export interface ISetGuessAction {
  type: typeof SET_GUESS;
  payload: string;
}

export type StateActions =
  | ISetGuessAction
  | IAddAttemptAction
  | ISetHintAction
  | ISetErrorAction
  | ISetCorrect;

export function setGuess(guess: string): ISetGuessAction {
  return { type: SET_GUESS, payload: guess };
}

export function rootReducer(
  state: IStoreState = INITIAL_STATE,
  action: StateActions
) {
  switch (action.type) {
    case ADD_ATTEMPT:
      return produce(state, (draft) => {
        draft.attempts.push(action.payload);
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
        draft.guess = action.payload;
      });

    default:
      return state;
  }
}
