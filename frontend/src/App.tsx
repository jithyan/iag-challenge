import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Attempt } from "./components/Attempt";
import { DigitBlock } from "./components/DigitBlock";
import { Entry } from "./components/Entry";
import { ErrorNotification } from "./components/ErrorNotification";
import { Container, Row, Col } from "./components/Grid";
import { startNewGame } from "./data/actions";
import { IStoreState } from "./data/reducers";

export function App() {
  const hint = useSelector<IStoreState, string>((state) => state.hint);
  const attempts = useSelector<IStoreState, any[]>((state) => state.attempts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  return (
    <ThemeProvider
      theme={{
        $baseColor: "#e8e8e8",
        $highlightColor: "#f05454",
        $textColor: "#222831",
        $darkBaseColor: "#30475e",
      }}
    >
      <Container>
        <Row topMargin="large" bottomMargin="medium">
          <Col>
            <h1>Guess the Password!</h1>
          </Col>
        </Row>

        <ErrorNotification />

        <Row bottomMargin="medium">
          <Col>
            <div className="list-group list-group-horizontal">
              {hint.split("").map((d) => (
                <DigitBlock key={d} digit={d} />
              ))}
            </div>
          </Col>
        </Row>

        {attempts.map(({ answer, highlight }, index) => (
          <Attempt
            key={`${answer}-${index}`}
            number={index + 1}
            guess={answer}
            highlight={highlight}
          />
        ))}

        <Entry />
      </Container>
    </ThemeProvider>
  );
}
