import { highlight } from "./util";

export interface INewPasswordResponseBody {
  hint: string;
}

export interface ICorrectAnswerResponseBody {
  correct: boolean;
  hint: string;
  answer: string;
}

export interface IWrongAnswerResponseBody extends ICorrectAnswerResponseBody {
  highlight: string[];
}

export function Hint(hint: string) {
  return {
    hint,
  };
}

export function CorrectAnswer(
  hint: string,
  answer: string
): ICorrectAnswerResponseBody {
  return {
    correct: true,
    hint,
    answer,
  };
}

export function WrongAnswer(
  hint: string,
  answer: string,
  actual: string
): IWrongAnswerResponseBody {
  return {
    correct: false,
    hint,
    answer,
    highlight: highlight(actual, answer),
  };
}
