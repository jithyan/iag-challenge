import { useDispatch, useSelector } from "react-redux";
import {
  IStoreState,
  setGuess,
  startNewGame,
  verifyAttempt,
} from "../data/reducers";

interface IAttemptProps {
  highlight: string[];
  guess: string;
}

export function Attempt({ highlight, guess }: IAttemptProps) {
  const correct = new Set(highlight);
  const digits = guess.split("");

  return guess.length > 0 ? (
    <div>
      {digits.map((d) => (
        <DigitBlock key={d} digit={d} invert={correct.has(d)} />
      ))}
    </div>
  ) : null;
}

interface ICharBlockProps {
  digit: string;
  invert: boolean;
}

export function DigitBlock({ digit, invert }: ICharBlockProps) {
  return <span>{digit}</span>;
}

export function Entry() {
  const isCorrect = useSelector<IStoreState, boolean>((state) => state.correct);
  const guess = useSelector<IStoreState, string>((state) => state.guess);
  const hint = useSelector<IStoreState, string>((state) => state.hint);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <input
          readOnly={isCorrect}
          value={guess}
          onChange={(e) => dispatch(setGuess(e.target.value))}
        />
      </div>
      <div>
        <button
          onClick={() => {
            isCorrect
              ? dispatch(startNewGame())
              : dispatch(verifyAttempt({ hint, guess }));
          }}
        >
          {isCorrect ? "Start a new game" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export function ErrorNotification() {
  const hasError = useSelector<IStoreState, boolean>((state) => state.error);
  return hasError ? <div>Sorry! The API failed on us.</div> : null;
}
