import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Attempt,
  DigitBlock,
  Entry,
  ErrorNotification,
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
    <div className="App">
      <h1>Guess the Password!</h1>
      <ErrorNotification />
      {hint.split("").map((d) => (
        <DigitBlock key={d} digit={d} invert={false} />
      ))}
      {attempts.map(({ answer, highlight }) => (
        <Attempt key={answer} guess={answer} highlight={highlight} />
      ))}
      <Entry />
    </div>
  );
}
