import { highlight } from "./util";

export function Hint(hint: string) {
  return {
    hint,
  };
}

export function CorrectAnswer(hint: string, answer: string) {
  return {
    correct: true,
    hint,
    answer,
  };
}

export function IncorrectAnswer(hint: string, answer: string, actual: string) {
  return {
    correct: false,
    hint,
    answer,
    highlight: highlight(actual, answer),
  };
}
