import { useDispatch, useSelector } from "react-redux";
import {
  IStoreState,
  setGuess,
  startNewGame,
  verifyAttempt,
} from "../data/reducers";
import { FaArrowRight } from "react-icons/fa";

interface IAttemptProps {
  highlight: string[];
  guess: string;
  number: number;
}

export function Attempt({ highlight, guess, number }: IAttemptProps) {
  const correct = new Set(highlight);
  const alreadyHighlighted = new Set();
  const digits = guess.split("");

  return guess.length > 0 ? (
    <div className="list-group list-group-horizontal">
      <p style={{ fontWeight: "bold" }}>Attempt #{number} </p> <FaArrowRight />
      {digits.map((d) => {
        const highlight = !alreadyHighlighted.has(d) && correct.has(d);
        alreadyHighlighted.add(d);
        return (
          <DigitBlock
            style={{
              backgroundColor: highlight ? "#f05454" : "#30475e",
              color: highlight ? "#222831" : "white",
              fontWeight: "bold",
            }}
            key={d}
            digit={d}
            invert={correct.has(d)}
          />
        );
      })}
    </div>
  ) : null;
}

interface ICharBlockProps {
  digit: string;
  invert: boolean;
  style?: any;
}

export function DigitBlock({ digit, invert, style = {} }: ICharBlockProps) {
  return (
    <span
      style={{ color: "#495464", ...style }}
      className="list-group-item .flex-fill"
    >
      {digit}
    </span>
  );
}

export function Entry() {
  const isCorrect = useSelector<IStoreState, boolean>((state) => state.correct);
  const guess = useSelector<IStoreState, string>((state) => state.guess);
  const hint = useSelector<IStoreState, string>((state) => state.hint);
  const dispatch = useDispatch();

  return (
    <>
      <SingleColRow>
        <div className="input-group input-group-lg">
          <input
            readOnly={isCorrect}
            value={guess}
            onChange={(e) => dispatch(setGuess(e.target.value))}
            placeholder="Type here"
            className="form-control"
            type="text"
          />
        </div>
      </SingleColRow>
      <SingleColRow>
        <button
          onClick={() => {
            isCorrect
              ? dispatch(startNewGame())
              : dispatch(verifyAttempt({ hint, guess }));
          }}
        >
          {isCorrect ? "Start a new game" : "Submit"}
        </button>
      </SingleColRow>
    </>
  );
}

export function ErrorNotification() {
  const hasError = useSelector<IStoreState, boolean>((state) => state.error);
  return hasError ? (
    <SingleColRow>Sorry! The API failed on us.</SingleColRow>
  ) : null;
}

export function SingleColRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }} className="row">
      <div className="col">{children}</div>
    </div>
  );
}
