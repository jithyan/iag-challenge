import { useSelector, useDispatch } from "react-redux";
import { setGuess, startNewGame, verifyAttempt } from "../data/actions";
import { IStoreState } from "../data/reducers";
import { Row, Col } from "./Grid";

export function Entry() {
  const isCorrect = useSelector<IStoreState, boolean>((state) => state.correct);
  const guess = useSelector<IStoreState, string>((state) => state.guess);
  const hint = useSelector<IStoreState, string>((state) => state.hint);
  const dispatch = useDispatch();

  return (
    <>
      <Row bottomMargin="large">
        <div className="col-md-4">
          <div className="input-group input-group-lg">
            <input
              readOnly={isCorrect}
              value={guess}
              onChange={(e) => dispatch(setGuess(e.target.value))}
              placeholder="Type here"
              className="form-control"
              type="text"
              maxLength={8}
            />
          </div>
        </div>
      </Row>
      <Row>
        <Col>
          <button
            className={`btn btn-${isCorrect ? "success" : "dark"} btn-lg`}
            onClick={() => {
              isCorrect
                ? dispatch(startNewGame())
                : dispatch(verifyAttempt({ hint, guess }));
            }}
          >
            {isCorrect ? "Well done! Start a new game" : "Submit"}
          </button>
        </Col>
      </Row>
    </>
  );
}
