import styled from "styled-components";
import { DigitBlock } from "./DigitBlock";
import { Row, Col } from "./Grid";

interface IAttemptProps {
  highlight: string[];
  guess: string;
  number: number;
}

const Bold = styled.p`
  ${(props) => `
    font-weight: bold;
  `}
`;

export function Attempt({ highlight, guess, number }: IAttemptProps) {
  const correct = new Set(highlight);
  const digits = guess.split("");

  return guess.length > 0 ? (
    <Row>
      <Col>
        <div>
          <Bold>Attempt #{number} </Bold>{" "}
        </div>

        <div className="list-group list-group-horizontal">
          {digits.map((d, index) => (
            <DigitBlock
              variant={correct.has(d) ? "highlight" : "normal"}
              key={`${d}-${index}`}
              digit={d}
            />
          ))}
        </div>
      </Col>
    </Row>
  ) : null;
}
