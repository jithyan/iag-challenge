import { IAttempt } from "./reducers";

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

export interface ISetHintAction {
  type: typeof SET_HINT;
  payload: string;
}

export interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export interface IAddAttemptAction {
  type: typeof ADD_ATTEMPT;
  payload: any;
}

export interface ISetGuessAction {
  type: typeof SET_GUESS;
  payload: string;
}

export type StateUpdateActions =
  | ISetGuessAction
  | IAddAttemptAction
  | ISetHintAction
  | ISetErrorAction
  | ISetCorrect;

export function setCorrect(correct: boolean): StateUpdateActions {
  return { type: SET_CORRECT, payload: correct };
}

export function setHint(hint: string): StateUpdateActions {
  return { type: SET_HINT, payload: hint };
}

export function setError(error: string): StateUpdateActions {
  return { type: SET_ERROR, payload: error };
}

export function addAttempt(attempt: IAttempt): StateUpdateActions {
  return { type: ADD_ATTEMPT, payload: attempt };
}

export function setGuess(guess: string): StateUpdateActions {
  return { type: SET_GUESS, payload: guess };
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
export function startNewGame(): IStartNewGameAction {
  return { type: START_NEW_GAME };
}
