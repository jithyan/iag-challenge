import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Attempt,
  DigitBlock,
  Entry,
  ErrorNotification,
  SingleColRow,
} from "./components/Attempt";
import { IStoreState, startNewGame } from "./data/reducers";

export function App() {
  const hint = useSelector<IStoreState, string>((state) => state.hint);
  const attempts = useSelector<IStoreState, any[]>((state) => state.attempts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#e8e8e8" }} className="container">
      <SingleColRow>
        <h1 style={{ color: "#222831" }}>Guess the Password!</h1>
      </SingleColRow>
      <ErrorNotification />
      <SingleColRow>
        <div className="list-group list-group-horizontal">
          {hint.split("").map((d) => (
            <DigitBlock
              style={{
                backgroundColor: "#30475e",
                color: "white",
                fontWeight: "bold",
              }}
              key={d}
              digit={d}
              invert={false}
            />
          ))}
        </div>
      </SingleColRow>
      <SingleColRow>
        {attempts.map(({ answer, highlight }, index) => (
          <Attempt
            key={`${answer}-${index}`}
            number={index + 1}
            guess={answer}
            highlight={highlight}
          />
        ))}
      </SingleColRow>
      <Entry />
    </div>
  );
}
